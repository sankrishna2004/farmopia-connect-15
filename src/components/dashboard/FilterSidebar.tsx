
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Mock data for specialties (for filtering)
const specialties = ["Rice", "Pulses", "Turmeric", "Chillies", "Groundnut", "Storage Crops"];

// Mock data for locations (for filtering)
const locations = ["Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala"];

const FilterSidebar = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-medium">Filter Farmers</h3>
        
        <div className="space-y-2">
          <Label>Location</Label>
          <select 
            className="w-full p-2 border rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>Specialty</Label>
          <select 
            className="w-full p-2 border rounded-md"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
