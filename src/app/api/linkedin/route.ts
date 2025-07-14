import { NextRequest, NextResponse } from 'next/server'

// Configuration de l'API Horizon Data Wave
const API_CONFIG = {
  BASE_URL: "https://api.horizondatawave.ai",
  ENDPOINTS: {
    SEARCH_USERS: "/api/linkedin/search/users",
    USER_PROFILE: "/api/linkedin/user",
    LINKEDIN_EMAIL: "/api/linkedin/email/user",
    LINKEDIN_USER_POSTS: "/api/linkedin/user/posts",
  }
}

async function makeLinkedInRequest(endpoint: string, data: any): Promise<any> {
  const apiKey = process.env.HDW_ACCESS_TOKEN
  
  if (!apiKey) {
    throw new Error('HDW_ACCESS_TOKEN non configuré')
  }

  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': apiKey,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`API LinkedIn error: ${response.status} ${errorData.message || response.statusText}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    const { type, value } = await request.json()

    if (!type || !value) {
      return NextResponse.json(
        { error: 'Type et valeur requis' },
        { status: 400 }
      )
    }

    let prospectData: any = {}

    switch (type) {
      case 'profile': {
        // Recherche par profil (URL ou nom d'utilisateur)
        const profileData = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.USER_PROFILE, {
          user: value,
          with_experience: true,
          with_education: true,
          with_skills: true,
          timeout: 300
        })

        prospectData.profile = profileData

        // Essayer de récupérer les posts si on a un URN
        if (profileData.urn) {
          try {
            const postsData = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.LINKEDIN_USER_POSTS, {
              urn: profileData.urn,
              count: 10,
              timeout: 300
            })
            prospectData.posts = postsData
          } catch (error) {
            console.log('Impossible de récupérer les posts:', error)
          }
        }
        break
      }

      case 'email': {
        // Recherche par email
        const emailData = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.LINKEDIN_EMAIL, {
          email: value,
          count: 5,
          timeout: 300
        })

        if (emailData && emailData.length > 0) {
          prospectData.profile = emailData[0]
          
          // Essayer de récupérer plus de détails sur le premier profil trouvé
          if (emailData[0].urn || emailData[0].url) {
            try {
              const detailedProfile = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.USER_PROFILE, {
                user: emailData[0].urn || emailData[0].url,
                with_experience: true,
                with_education: true,
                with_skills: true,
                timeout: 300
              })
              prospectData.profile = { ...prospectData.profile, ...detailedProfile }
            } catch (error) {
              console.log('Impossible de récupérer les détails du profil:', error)
            }
          }
        }
        break
      }

      case 'search': {
        // Recherche avancée
        const searchData = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.SEARCH_USERS, {
          keywords: value,
          count: 10,
          timeout: 300
        })

        if (searchData && searchData.length > 0) {
          // Prendre le premier résultat et récupérer ses détails
          const firstResult = searchData[0]
          prospectData.profile = firstResult
          
          // Essayer de récupérer plus de détails
          if (firstResult.urn || firstResult.url) {
            try {
              const detailedProfile = await makeLinkedInRequest(API_CONFIG.ENDPOINTS.USER_PROFILE, {
                user: firstResult.urn || firstResult.url,
                with_experience: true,
                with_education: true,
                with_skills: true,
                timeout: 300
              })
              prospectData.profile = { ...prospectData.profile, ...detailedProfile }
            } catch (error) {
              console.log('Impossible de récupérer les détails du profil:', error)
            }
          }

          // Ajouter tous les résultats de recherche
          prospectData.searchResults = searchData
        }
        break
      }

      default:
        return NextResponse.json(
          { error: 'Type de recherche non supporté' },
          { status: 400 }
        )
    }

    return NextResponse.json(prospectData)

  } catch (error) {
    console.error('Erreur API LinkedIn:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Erreur interne du serveur',
        details: 'Vérifiez votre configuration HDW_ACCESS_TOKEN et HDW_ACCOUNT_ID'
      },
      { status: 500 }
    )
  }
}