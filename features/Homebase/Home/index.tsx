"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomepageFeature = () => {
  return (
    <main>
      <section className="container">
        <h1>Hello World</h1>
        <p>This is berkah</p>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </section>
    </main>
  );
};

export default HomepageFeature;
