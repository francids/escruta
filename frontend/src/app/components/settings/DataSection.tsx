import CommonBar from "../CommonBar";
import { Button } from "@/shared/ui";

export default function DataSection() {
  return (
    <CommonBar className="flex-col justify-center items-start">
      <h2 className="text-xl font-medium mb-4">Data</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button variant="secondary">Export data</Button>
          <Button variant="secondary">Import data</Button>
        </div>
      </div>
    </CommonBar>
  );
}
