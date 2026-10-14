"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Clock, Plus, Trash2 } from "lucide-react";

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export default function DoctorAvailabilityPage() {
  const params = useParams();
  const id = params.id as string;
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/doctors/${id}/availability`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        setAvailability(data.data?.availability || []);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSlot = () => {
    setAvailability([...availability, { day: "Monday", startTime: "09:00", endTime: "17:00" }]);
  };

  const removeSlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/doctors/${id}/availability`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability }),
      });
      fetchAvailability();
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Availability</h1>
          <p className="text-muted-foreground">Manage the doctor's available consultation slots.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={addSlot}>
            <Plus className="h-4 w-4 mr-2" /> Add Slot
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save Availability
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">Available Slots</h3>
        </div>
        <div className="p-4 space-y-3">
          {availability.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No availability slots set</p>
          ) : (
            availability.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{slot.day}</p>
                    <p className="text-sm text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => removeSlot(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}