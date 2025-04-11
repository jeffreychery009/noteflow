export async function createFolder(
  title: string,
  mutate: any,
  data: any,
  toast: any,
  setIsLoading: any
) {
  try {
    setIsLoading(true);
    console.log("Initial data from SWR:", data);

    // Optimistically update the UI
    const optimisticFolder = {
      _id: Date.now().toString(),
      title,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Get current folders array
    const currentFolders = data?.data?.folders || [];
    console.log("Current folders:", currentFolders);
    console.log("Adding optimistic folder:", optimisticFolder);

    // Create new data structure
    const optimisticData = {
      success: true,
      data: {
        ...data?.data,
        folders: [...currentFolders, optimisticFolder],
      },
    };
    console.log("New data structure:", optimisticData);

    // Update the cache optimistically
    await mutate(optimisticData, false);

    // Make the actual API request
    const response = await fetch("/api/folders", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("API response:", result);

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
    console.error("Error in createFolder:", error);
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
