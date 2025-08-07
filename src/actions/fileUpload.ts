"use server";

import { auth } from "@/src/auth";

export interface FileUploadResponse {
  success: boolean;
  message: string;
  fileDto?: {
    id: string;
    originalFilename: string;
    contentType: string;
    fileSize: number;
    fileType: "RESUME" | "JOB_DESCRIPTION";
    userId: string;
    uploadDate: string;
    downloadUrl: string;
  };
  error?: string;
}

export async function uploadFile(
  formData: FormData,
  fileType: "RESUME" | "JOB_DESCRIPTION"
): Promise<FileUploadResponse> {
  try {
    // Get session for authentication
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to upload files"
      };
    }

    // Get the JWT token from session
    const jwtToken = session.jwtToken;
    
    if (!jwtToken) {
      return {
        success: false,
        message: "Authentication token missing",
        error: "JWT token not found in session"
      };
    }

    // Prepare form data for backend
    const uploadFormData = new FormData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return {
        success: false,
        message: "No file provided",
        error: "File is required"
      };
    }

    uploadFormData.append('file', file);
    uploadFormData.append('fileType', fileType);

    // Send to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/files/upload`, {
      method: "POST",
      headers: {
        'Cookie': `jwt=${jwtToken}` // Send JWT as cookie
      },
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: "Upload failed",
        error: `HTTP ${response.status}: ${errorText}`
      };
    }

    const result: FileUploadResponse = await response.json();
    return result;

  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      message: "Upload failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function getMyFiles(): Promise<{
  success: boolean;
  files?: any[];
  error?: string;
}> {
  try {
    const session = await auth();
    
    if (!session?.user?.id || !session.jwtToken) {
      return {
        success: false,
        error: "Authentication required"
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/files/my-files`, {
      method: "GET",
      headers: {
        'Cookie': `jwt=${session.jwtToken}`
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${await response.text()}`
      };
    }

    const files = await response.json();
    return {
      success: true,
      files
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function getMyFilesByType(fileType: "RESUME" | "JOB_DESCRIPTION"): Promise<{
  success: boolean;
  files?: any[];
  error?: string;
}> {
  try {
    const session = await auth();
    
    if (!session?.user?.id || !session.jwtToken) {
      return {
        success: false,
        error: "Authentication required"
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/files/my-files/type/${fileType}`, {
      method: "GET",
      headers: {
        'Cookie': `jwt=${session.jwtToken}`
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${await response.text()}`
      };
    }

    const files = await response.json();
    return {
      success: true,
      files
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function deleteFile(fileId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const session = await auth();
    
    if (!session?.user?.id || !session.jwtToken) {
      return {
        success: false,
        error: "Authentication required"
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/files/${fileId}`, {
      method: "DELETE",
      headers: {
        'Cookie': `jwt=${session.jwtToken}`
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${await response.text()}`
      };
    }

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}