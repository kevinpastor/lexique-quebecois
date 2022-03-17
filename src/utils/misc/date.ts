export const formatDate = (date: number | Date): string => {
    const locale: string = "fr-CA";
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    if (typeof date === "number") {
        return new Date(date)
            .toLocaleDateString(locale, options);
    }

    return date.toLocaleDateString(locale, options);
};
