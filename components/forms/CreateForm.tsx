import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useCreateFolder } from "@/hooks/folders/useCreateFolder";
import { useToast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Folder name is required!"),
});

interface CreateFormProps {
  setIsDialogOpen: (open: boolean) => void;
}

export default function CreateForm({ setIsDialogOpen }: CreateFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { createFolder } = useCreateFolder();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);

    try {
      const result = await createFolder(values.name);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        className: "bg-green-500 text-white dark:bg-green-900",
        variant: "default",
        title: "Folder Created Successfully!",
        description: "Your new folder has been added to your workspace.",
      });

      setIsDialogOpen(false);
      form.reset();
    } catch (err: any) {
      console.error("Create folder error:", err);
      toast({
        variant: "destructive",
        title: "Error Creating Folder",
        description:
          err.message ||
          "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter folder name"
                    disabled={isCreating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
