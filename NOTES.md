# Notes

## Colors

### Elevation

| Elevation level | White overlay transparency |
|-----------------|----------------------------|
| 00dp            | 0%                         |
| 01dp            | 5%                         |
| 02dp            | 7%                         |
| 03dp            | 8%                         |
| 04dp            | 9%                         |
| 06dp            | 11%                        |
| 08dp            | 12%                        |
| 12dp            | 14%                        |
| 16dp            | 15%                        |
| 24dp            | 16%                        |

### Text

| Emphasis | White overlay transparency |
|----------|----------------------------|
| High     | 87%                        |
| Medium   | 60%                        |
| Disabled | 38%                        |

### State

| Status  | White overlay transparency |
|---------|----------------------------|
| Hovered | 4%                         |
| Focused | 12% (100% border if any)   |
| Pressed | 10%                        |
| Dragged | 8%                         |

### Disabled

12% opacity

### Outline

12% opacity

## Analysis Reports

| Date       | Shared (kB) | Bundle (KB) | Source Map (KB) | Transfered (B) | Resources (B) |
|------------|-------------|-------------|-----------------|----------------|---------------|
| 04/08/2022 |             | 792.66      | 793.66          |                |               |
| 04/08/2022 |             | 816.88      | 817.92          | 882 kB         | 1.8 MB        |
| 04/08/2022 |             | 755.52      | 756.57          | 749 kB         | 1.7 MB        |
| 04/08/2022 |             | 738.4       | 739.92          | 819 kB         | 1.5 MB        |
| 09/08/2022 |             | 736.82      | 738.4           | 795 kB         | 1.4 MB        |
| 19/08/2022 |             | 758.78      | 760.4           | 262 kB         | 920 kB        |
| 21/08/2022 |             | 761.16      | 762.78          | 263 kB         | 922 kB        |
| 25/08/2022 | 126         | 761.2       | 762.81          | 256 kB         | 861 kB        |
| 20/09/2022 | 127         | 764.24      | 765.86          | 259 kB         | 924 kB        |
| 20/09/2022 | 143         | 757.35      | 758.72          | 459 kB         | 1.3 MB        |
| 20/09/2022 | 143         | 757.92      | 759.3           | 445210         | 1301218       |
| 20/09/2022 | 143         | 757.84      | 759.22          | 445481         | 1301601       |
| 26/09/2022 | 171         | 785.71      | 787             |                |               |
| 26/09/2022 | 154         | 804.8       | 806.27          | 435708         | 1310313       |
| 26/09/2022 | 154         | 804.7       | 806.18          | 435647         | 1309715       |
| 26/09/2022 | 154         | 804.42      | 805.89          | 435543         | 1309051       |
| 28/09/2022 | 138         | 804.4       | 806.02          | 437633         | 1301838       |
| 28/09/2022 | 138         | 804.45      | 806.07          | 438077         | 1303977       |
| 07/10/2022 | 138         | 802.16      | 803.78          | 437443         | 1304402       |
| 26/10/2022 | 138         | 804.08      | 805.7           | 401836         | 1247973       |


## OG Template


const fontUrl: URL = new URL("./Lora-SemiBold-600.ttf", import.meta.url);
// const fontUrl: URL = new URL("https://fonts.gstatic.com/s/lora/v26/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJG.ttf");
const font: Promise<ArrayBuffer> = fetch(fontUrl)
    .then((response: Response): Promise<ArrayBuffer> => {
        return response.arrayBuffer();
    });

const template = (title: string): ReactElement => (
    <div
        style={{
            height: "100%",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 128,
            fontWeight: 600,
            fontFamily: "Lora",
            color: "#000000DE"
        }}
    >
        <svg
            height="256"
            viewBox="0 0 144 165"
            fill="#000000DE"
            style={{ marginBottom: "16px" }}
        >
            <path d="M72 76.4C53.12 58.8 27.84 48 0 48V136C27.84 136 53.12 146.8 72 164.4C90.88 146.88 116.16 136 144 136V48C116.16 48 90.88 58.8 72 76.4ZM72 48C85.28 48 96 37.28 96 24C96 10.72 85.28 0 72 0C58.72 0 48 10.72 48 24C48 37.28 58.72 48 72 48Z" />
        </svg>
        {title}
    </div>
);