    
    export function getLocalDateTimeString(date) {
        const offset = date.getTimezoneOffset();
        const offsetHours = Math.abs(Math.floor(offset / 60));
        const offsetMinutes = Math.abs(offset % 60);
        const sign = offset < 0 ? '+' : '-';

        const formattedOffset = `${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

        return date.toISOString().slice(0, 16) + formattedOffset;
    }