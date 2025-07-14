'use client'

import { useState } from 'react'
import { Search, Download, User, Building, Mail, MapPin, Loader2 } from 'lucide-react'

interface ProspectData {
  profile?: any
  posts?: any[]
  connections?: any[]
}

export default function Home() {
  const [searchType, setSearchType] = useState<'profile' | 'email' | 'search'>('profile')
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [prospectData, setProspectData] = useState<ProspectData | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Veuillez saisir une valeur de recherche')
      return
    }

    setLoading(true)
    setError('')
    setProspectData(null)

    try {
      const response = await fetch('/api/linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: searchType,
          value: searchValue,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche')
      }

      const data = await response.json()
      setProspectData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const downloadData = () => {
    if (!prospectData) return

    const dataStr = JSON.stringify(prospectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `prospect-linkedin-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          LinkedIn Prospect Downloader
        </h1>
        <p className="text-gray-600">
          Téléchargez facilement les profils LinkedIn de vos prospects
        </p>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Search className="mr-2" size={20} />
          Rechercher un prospect
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de recherche
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="profile"
                  checked={searchType === 'profile'}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="mr-2"
                />
                Profil (URL/Nom)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === 'email'}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="search"
                  checked={searchType === 'search'}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="mr-2"
                />
                Recherche avancée
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'profile' && 'URL LinkedIn ou nom d\'utilisateur'}
              {searchType === 'email' && 'Adresse email'}
              {searchType === 'search' && 'Mots-clés de recherche'}
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === 'profile' 
                  ? 'https://linkedin.com/in/username ou username'
                  : searchType === 'email'
                  ? 'email@example.com'
                  : 'Développeur JavaScript Paris'
              }
              className="input-field"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={loading || !searchValue.trim()}
            className="btn-primary flex items-center"
          >
            {loading ? (
              <Loader2 className="mr-2 animate-spin" size={16} />
            ) : (
              <Search className="mr-2" size={16} />
            )}
            {loading ? 'Recherche en cours...' : 'Rechercher'}
          </button>
        </div>
      </div>

      {prospectData && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <User className="mr-2" size={20} />
              Données du prospect
            </h2>
            <button
              onClick={downloadData}
              className="btn-primary flex items-center"
            >
              <Download className="mr-2" size={16} />
              Télécharger JSON
            </button>
          </div>

          {prospectData.profile && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Profil</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prospectData.profile.name && (
                    <div className="flex items-center">
                      <User className="mr-2 text-gray-500" size={16} />
                      <span className="font-medium">{prospectData.profile.name}</span>
                    </div>
                  )}
                  {prospectData.profile.headline && (
                    <div className="flex items-center">
                      <Building className="mr-2 text-gray-500" size={16} />
                      <span>{prospectData.profile.headline}</span>
                    </div>
                  )}
                  {prospectData.profile.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-2 text-gray-500" size={16} />
                      <span>{prospectData.profile.location}</span>
                    </div>
                  )}
                  {prospectData.profile.email && (
                    <div className="flex items-center">
                      <Mail className="mr-2 text-gray-500" size={16} />
                      <span>{prospectData.profile.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {prospectData.posts && prospectData.posts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">
                Publications récentes ({prospectData.posts.length})
              </h3>
              <div className="space-y-2">
                {prospectData.posts.slice(0, 3).map((post, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                    {post.text || post.content || 'Publication sans texte'}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Données récupérées le {new Date().toLocaleString('fr-FR')}
          </div>
        </div>
      )}
    </div>
  )
}