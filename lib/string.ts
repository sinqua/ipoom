export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // 한국 표준시 = UTC + 9시간
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstDate.getUTCDate()).padStart(2, "0");
    const hour = kstDate.getUTCHours();
    const minute = String(kstDate.getUTCMinutes()).padStart(2, "0");
    const ampm = hour < 12 ? "오전" : "오후";
    const formattedHour = String(hour % 12 || 12).padStart(2, "0");
    return `${year}-${month}-${day} ${ampm} ${formattedHour}:${minute}`;
}