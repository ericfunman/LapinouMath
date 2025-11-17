import { useState } from 'react';
import { UserProfile, GradeLevel } from '../types';
import { getAllProfiles, createProfile, deleteProfile } from '../utils/storage';
import { GRADE_LEVELS } from '../data/constants';

interface Props {
  onSelectProfile: (profile: UserProfile) => void;
}

export default function ProfileSelection({ onSelectProfile }: Props) {
  const [profiles, setProfiles] = useState<UserProfile[]>(getAllProfiles());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState<GradeLevel>('CE1');

  const handleCreateProfile = () => {
    if (newName.trim()) {
      const profile = createProfile(newName.trim(), newLevel);
      setProfiles([...profiles, profile]);
      setShowCreateForm(false);
      setNewName('');
      onSelectProfile(profile);
    }
  };

  const handleDeleteProfile = (id: string) => {
    deleteProfile(id);
    setProfiles(profiles.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">LapinouMath</h1>
          <p className="text-2xl text-gray-600">avec CalcuLapin 🐰</p>
          <p className="text-gray-500 mt-2">Apprends les maths en t'amusant !</p>
        </div>

        {!showCreateForm && (
          <>
            <div className="space-y-4 mb-6">
              {profiles.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Aucun profil créé. Commence par créer un profil !
                </div>
              ) : (
                profiles.map(profile => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <button
                      onClick={() => onSelectProfile(profile)}
                      className="flex items-center gap-4 flex-1 text-left"
                    >
                      <span className="text-4xl">{profile.avatar}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                        <p className="text-sm text-gray-600">
                          Niveau: {profile.currentLevel} • ⭐ {profile.totalStars} étoiles
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-100"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
            >
              + Créer un nouveau profil
            </button>
          </>
        )}

        {showCreateForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Prénom de l'élève
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-primary"
                placeholder="Entre ton prénom..."
                autoFocus
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Niveau scolaire
              </label>
              <select
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value as GradeLevel)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-primary"
              >
                {GRADE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateProfile}
                className="flex-1 bg-gradient-to-r from-success to-green-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                Créer
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewName('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
