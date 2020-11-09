export default function numberFormat(num) {
    if (typeof num !== "number") {
        return 'Произошла ошибка!';
    }
    return new Intl.NumberFormat().format(num);
}