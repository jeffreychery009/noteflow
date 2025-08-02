import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";

import { useAIChat } from "../../hooks/useAIChat";
import { Badge } from "../ui/badge";

export function AIStatusIndicator() {
  const { aiToken, isLoading, error } = useAIChat();

  if (isLoading) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Sparkles className="size-3 animate-spin" />
        Connecting...
      </Badge>
    );
  }

  if (error) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertCircle className="size-3" />
        AI Error
      </Badge>
    );
  }

  if (aiToken) {
    return (
      <Badge variant="default" className="flex items-center gap-1 bg-green-500">
        <CheckCircle className="size-3" />
        AI Ready
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <AlertCircle className="size-3" />
      AI Disconnected
    </Badge>
  );
}
