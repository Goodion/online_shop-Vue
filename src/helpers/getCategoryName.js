export default function getCategoryName(category) {
    switch (category) {
        case 'smartphones':
            return 'Смартфоны';
        case 'tablets':
            return 'Планшеты';
        case 'portable-speakers':
            return 'Портативная акустика';
    }
}