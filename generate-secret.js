#!/usr/bin/env node

// Script pour générer une clé secrète aléatoire pour NEXTAUTH_SECRET
import crypto from 'crypto';

const secret = crypto.randomBytes(32).toString('hex');

console.log('🔑 Clé secrète générée pour NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nCopiez cette valeur dans vos variables d\'environnement Vercel.');