export interface LogStatParams {
  originalType: string;
  convertedType: string;
  processingTime: number;
  fileSize: number;
}

export async function logConversionStat(params: LogStatParams) {
  try {
    const deviceInfo = {
      browser: navigator.userAgent,
      platform: navigator.platform,
    };

    const response = await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
        deviceInfo,
      }),
    });

    if (!response.ok) {
      console.warn("Failed to log conversion stat:", await response.text());
    }
  } catch (error) {
    console.warn("Error logging conversion stat:", error);
  }
}
