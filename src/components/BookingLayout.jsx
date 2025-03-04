import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Card, CardContent } from "../ui/card";

export default function BookingLayout() {
  const [date, setDate] = useState(null);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name} on ${format(date, "PPP")}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <Card className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <CardContent>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Book an Appointment</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date Picker */}
            <div>
              <Label className="text-gray-700 text-lg">Select Date</Label>
              <Popover>
                <PopoverTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-left shadow-sm focus:ring-2 focus:ring-blue-500">
                  {date ? format(date, "PPP") : "Pick a date"}
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Service Selection */}
            <div>
              <Label className="text-gray-700 text-lg">Service</Label>
              <Select 
                value={service} 
                onChange={(e) => setService(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                <option value="consultation">Consultation</option>
                <option value="therapy">Therapy Session</option>
                <option value="massage">Massage</option>
              </Select>
            </div>

            {/* Name Input */}
            <div>
              <Label className="text-gray-700 text-lg">Full Name</Label>
              <Input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <Label className="text-gray-700 text-lg">Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:scale-105 transition transform"
            >
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
