"use client";

import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { IDE } from "@/components/ui/dataDisplay/IDE";
import { Textarea } from "@/components/ui/forms/Textarea/Textarea";

export default function Home() {
  return (
    <div className="grid grid-cols-12 p-8 gap-8 min-h-dvh">
      <Card.Root className="col-span-8 h-full p-4">
        <IDE />
      </Card.Root>
      <Card.Root className="col-span-4 h-full p-4 gap-4">
        <Textarea
          required
          rows={5}
          label="Ipunts:"
          placeholder="EX: 10, 45, 45, 1000"
        />
        <div className="flex justify-end">
          <Button type="submit">Run</Button>
        </div>
      </Card.Root>
    </div>
  );
}
