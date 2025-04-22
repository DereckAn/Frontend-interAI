interface InterviewItemProps {
  interview: {
    id: number;
    title: string;
    date: Date;
    score: number;
  };
}

import { Button } from "@/src/components/ui/button";

export function InterviewItem({ interview }: InterviewItemProps) {
  return (
    <div className="border p-4 rounded-md hover:bg-gray-50 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{interview.title}</h3>
          <p className="text-sm text-gray-500">
            Completed on {interview.date.toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
      <div className="mt-2">
        <p className="text-sm">Score: {interview.score}/100</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${interview.score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
