/**
 * Profile Page
 * Purpose: User profile management, account settings, preferences
 */

'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Mail, User, Phone, Globe, Save, Camera, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    website: '',
    timezone: 'UTC',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    emailAlerts: false,
    tradeConfirmation: true,
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile(formData)
      // Success toast shown by hook
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Profile Settings</h1>
          <p className="text-dark-400 mt-1">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile picture section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar
                src={user?.avatar || null}
                name={user?.name || 'User'}
                size="2xl"
                showStatus
                isOnline
              />
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload New Photo
                </Button>
                <p className="text-xs text-dark-400 mt-2">
                  JPG, PNG. Max 5MB. Square image works best.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                leftIcon={<Phone className="w-4 h-4" />}
                placeholder="+1 (555) 000-0000"
              />
              <Input
                label="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                leftIcon={<Globe className="w-4 h-4" />}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-dark-200 mb-2 block">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-dark-200 mb-2 block">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-dark-200 mb-2 block">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-dark-400">Receive updates via email</p>
              </div>
              <Switch
                checked={formData.emailNotifications}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, emailNotifications: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-dark-400">Browser push notifications</p>
              </div>
              <Switch
                checked={formData.pushNotifications}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, pushNotifications: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Price Alert Emails</p>
                <p className="text-sm text-dark-400">Get notified when price targets are hit</p>
              </div>
              <Switch
                checked={formData.emailAlerts}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, emailAlerts: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Trade Confirmation</p>
                <p className="text-sm text-dark-400">Confirm before executing trades</p>
              </div>
              <Switch
                checked={formData.tradeConfirmation}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, tradeConfirmation: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
