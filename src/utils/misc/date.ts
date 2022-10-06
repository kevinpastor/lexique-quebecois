export const formatDate = (date: Date): string => {
    const locale: string = "fr-CA";
    const options: Intl.DateTimeFormatOptions = {
        dateStyle: "long"
    };

    return date.toLocaleDateString(locale, options);
};
