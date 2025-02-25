
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export default function Review() {
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTranscript(params.get('transcript') || '');
  }, []);

  const handleSubmit = () => {
    // Handle submission logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Review Transcript</h1>
        <div className="bg-gray-100 p-4 rounded-lg mb-6 min-h-[200px]">
          {transcript}
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
