"use client";

import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@rr-kuse/ui";
import { Sparkles } from "lucide-react";

type EntryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  /** Optional AI questionnaire section - shown when provided */
  aiQuestionnaire?: {
    label: string;
    description: string;
    onUse?: () => void;
  };
  /** Footer action - e.g. form submit button */
  footer?: React.ReactNode;
};

/**
 * Reusable modal for add/edit entry flows.
 * Matches the reference: title, subtitle, close X, optional AI section, content, footer.
 */
export function EntryModal({
  open,
  onOpenChange,
  trigger,
  title,
  subtitle,
  children,
  aiQuestionnaire,
  footer,
}: EntryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="pr-10">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {aiQuestionnaire && (
          <div className="px-6 pb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={aiQuestionnaire.onUse}
            >
              <Sparkles className="h-4 w-4" />
              {aiQuestionnaire.label}
            </Button>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {aiQuestionnaire.description}
            </p>
          </div>
        )}
        <DialogBody className="flex-1 min-h-0">{children}</DialogBody>
        {footer && (
          <DialogFooter className="border-t border-border">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
