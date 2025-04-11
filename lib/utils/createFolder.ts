export async function createFolder(
  title: string,
  mutate: any,
  data: any,
  toast: any,
  setIsLoading: any
) {
  try {
    setIsLoading(true);
    console.log("Current data structure:", data); // Log current data

    // Optimistically update the UI
    const optimisticFolder = {
      _id: Date.now().toString(), // Temporary ID
      title,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Optimistic folder:", optimisticFolder); // Log optimistic folder

    // Update the cache optimistically
    await mutate(
      "/api/folders",
      {
        success: true,
        data: {
          ...data?.data,
          folders: [...(data?.data?.folders || []), optimisticFolder],
        },
      },
      false
    );

    // Make the actual API request
    const response = await fetch("/api/folders", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    await mutate();

    const result = await response.json();
    console.log("API response:", result); // Log API response

    if (result.success) {
      // Update the cache with the real data
      await mutate();
      toast({
        className: "bg-green-500 text-white dark:bg-green-900",
        variant: "default",
        title: "Folder Created Successfully!",
        description: "Your new folder has been added to your workspace.",
      });
    } else {
      // If there's an error, rollback the optimistic update
      await mutate(data, false);
      toast({
        variant: "destructive",
        title: "Failed to Create Folder",
        description:
          result.message || "Something went wrong. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    // Rollback on error
    await mutate(data, false);
    toast({
      variant: "destructive",
      title: "Error Creating Folder",
      description: "An unexpected error occurred. Please try again later.",
    });
  } finally {
    setIsLoading(false);
  }
}
