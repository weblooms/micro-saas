"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [text, setText] = useState("");
  const [observations, setObservations] = useState<any[]>([]);

  const fetchObservations = async () => {
    const { data, error } = await supabase
      .from("observations")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setObservations(data);
    }

    if (error) {
      console.log(error);
    }
  };

  const saveObservation = async () => {
    const { error } = await supabase
      .from("observations")
      .insert([{ content: text }]);

    if (error) {
      alert("Error saving");
      console.log(error);
    } else {
      alert("Saved!");
      setText("");
      fetchObservations();
    }
  };

  useEffect(() => {
    fetchObservations();
  }, []);

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Founder Observation Tracker</h1>

      <textarea
        className="border p-3 w-full mb-4 rounded"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your observation..."
      />

      <button
        onClick={saveObservation}
        className="bg-black text-white px-4 py-2 rounded mb-8"
      >
        Save Observation
      </button>

      <div className="space-y-4">
        {observations.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            {item.content}
          </div>
        ))}
      </div>
    </main>
  );
}
