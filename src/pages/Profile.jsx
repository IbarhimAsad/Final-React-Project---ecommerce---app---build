import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { PageLoader } from "../components/ui/Loader"

export default function Profile() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
  })

  useEffect(() => {
    if (!state.user) {
      navigate("/login")
      return
    }
    setFormData({
      name: state.user.name || "",
      email: state.user.email || "",
      phone: state.user.phone || "",
      bio: state.user.bio || "",
      location: state.user.location || "",
    })
  }, [state.user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    dispatch({ type: "UPDATE_USER", payload: formData })
    setLoading(false)
    alert("Profile updated successfully!")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!state.user) return <PageLoader />

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              {["profile", "security", "preferences"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-primary-600 text-primary-600 dark:text-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold">
                    {state.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{state.user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{state.user.email}</p>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => navigate("/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" placeholder="Enter current password" />
                    <Input label="New Password" type="password" placeholder="Enter new password" />
                    <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Email notifications", description: "Receive updates via email" },
                      { label: "Course updates", description: "Get notified about new course content" },
                      { label: "Marketing emails", description: "Receive promotional offers and updates" },
                    ].map((item, i) => (
                      <label key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Language</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Video Playback Speed</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                        <option>1x (Normal)</option>
                        <option>1.25x</option>
                        <option>1.5x</option>
                        <option>2x</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

