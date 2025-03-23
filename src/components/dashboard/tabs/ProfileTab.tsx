
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for locations and specialties
const locations = ["Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala"];
const specialties = ["Rice", "Pulses", "Turmeric", "Chillies", "Groundnut", "Storage Crops"];

const ProfileTab = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "9876543210", // Mock data
    address: "123 Farm Road, Rural District", // Mock data
    bio: user?.role === "farmer" 
      ? "Growing traditional crops using sustainable farming practices for over 15 years."
      : "Health-conscious consumer looking for high-quality farm products.",
    specialties: user?.role === "farmer" ? ["Rice", "Pulses"] : [],
    location: "Karnataka",
  });
  
  const handleSaveProfile = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          {!editMode ? (
            <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
          ) : (
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                disabled={!editMode}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!editMode}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!editMode}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                disabled={!editMode}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <select 
                id="location"
                className="w-full p-2 border rounded-md"
                value={profileData.location}
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                disabled={!editMode}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            {user?.role === "farmer" && (
              <div>
                <Label>Specialties</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editMode ? (
                    specialties.map(specialty => (
                      <Badge 
                        key={specialty}
                        variant={profileData.specialties.includes(specialty) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (profileData.specialties.includes(specialty)) {
                            setProfileData({
                              ...profileData, 
                              specialties: profileData.specialties.filter(s => s !== specialty)
                            });
                          } else {
                            setProfileData({
                              ...profileData, 
                              specialties: [...profileData.specialties, specialty]
                            });
                          }
                        }}
                      >
                        {specialty}
                      </Badge>
                    ))
                  ) : (
                    profileData.specialties.map(specialty => (
                      <Badge key={specialty}>{specialty}</Badge>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Label htmlFor="bio">Bio</Label>
          <textarea 
            id="bio"
            className="w-full p-2 border rounded-md h-24"
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            disabled={!editMode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
