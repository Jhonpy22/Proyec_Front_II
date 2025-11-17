import { createColumnHelper } from "@tanstack/react-table";
import Tabla from "../components/tabla";

interface Card extends Record<string, unknown> {
  id: number;
  cardNumber: string;
  holderName: string;
  bank: string;
  balance: number;
  creditLimit: number;
  expirationDate: string;
  status: string;
}

const columnHelper = createColumnHelper<Card>();

const CardsPage = () => {
  const mockCards: Card[] = [
    {
      id: 1,
      cardNumber: "4532 1234 5678 9010",
      holderName: "Juan Pérez Gómez",
      bank: "BAC San José",
      balance: 450000,
      creditLimit: 500000,
      expirationDate: "12/2026",
      status: "Activa",
    },
    {
      id: 2,
      cardNumber: "5425 2334 3010 9876",
      holderName: "María González Castro",
      bank: "Banco Nacional",
      balance: 280000,
      creditLimit: 350000,
      expirationDate: "08/2025",
      status: "Activa",
    },
    {
      id: 3,
      cardNumber: "4916 7890 1234 5678",
      holderName: "Carlos Rodríguez Mora",
      bank: "BCR",
      balance: 125000,
      creditLimit: 200000,
      expirationDate: "03/2027",
      status: "Activa",
    },
    {
      id: 4,
      cardNumber: "3782 8224 6310 0055",
      holderName: "Ana Sofía Vargas",
      bank: "Scotiabank",
      balance: 0,
      creditLimit: 150000,
      expirationDate: "06/2024",
      status: "Bloqueada",
    },
    {
      id: 5,
      cardNumber: "6011 1111 1111 1117",
      holderName: "Luis Fernando Jiménez",
      bank: "Banco Popular",
      balance: 95000,
      creditLimit: 300000,
      expirationDate: "11/2026",
      status: "Activa",
    },
    {
      id: 6,
      cardNumber: "5105 1051 0510 5100",
      holderName: "Joseth Manuel vargas",
      bank: "Davivienda",
      balance: 175000,
      creditLimit: 250000,
      expirationDate: "09/2025",
      status: "Activa",
    },
    {
      id: 7,
      cardNumber: "4111 1111 1111 1111",
      holderName: "Roberto Chavarría Solís",
      bank: "BAC San José",
      balance: 0,
      creditLimit: 400000,
      expirationDate: "01/2024",
      status: "Vencida",
    },
    {
      id: 8,
      cardNumber: "4242 4242 4242 4242",
      holderName: "Carmen Alvarado Torres",
      bank: "Promerica",
      balance: 320000,
      creditLimit: 450000,
      expirationDate: "05/2027",
      status: "Activa",
    },
    {
      id: 9,
      cardNumber: "5555 5555 5555 4444",
      holderName: "Diego Quesada Brenes",
      bank: "Banco Nacional",
      balance: 198000,
      creditLimit: 200000,
      expirationDate: "07/2026",
      status: "Activa",
    },
    {
      id: 10,
      cardNumber: "3056 9309 0259 0440",
      holderName: "Gabriela Monge Espinoza",
      bank: "BCR",
      balance: 85000,
      creditLimit: 180000,
      expirationDate: "10/2025",
      status: "Activa",
    },
  ];

  const columns = [
    columnHelper.accessor("cardNumber", {
      header: "Número de Tarjeta",
      cell: (info) => (
        <span className="font-mono font-semibold text-gray-800">
          {info.getValue()}
        </span>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("holderName", {
      header: "Titular",
      cell: (info) => (
        <div>
          <div className="font-semibold text-gray-800">{info.getValue()}</div>
          <div className="text-xs text-gray-500">{info.row.original.bank}</div>
        </div>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("balance", {
      header: "Saldo Disponible",
      cell: (info) => (
        <div>
          <div className="font-bold text-green-600">
            ₡{info.getValue().toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            de ₡{info.row.original.creditLimit.toLocaleString()}
          </div>
        </div>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("expirationDate", {
      header: "Vencimiento",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: (info) => {
        const statusColors: Record<string, string> = {
          Activa: "bg-green-100 text-green-800 border-green-300",
          Bloqueada: "bg-red-100 text-red-800 border-red-300",
          Vencida: "bg-gray-100 text-gray-800 border-gray-300",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              statusColors[info.getValue()] || "bg-gray-100 text-gray-800"
            }`}
          >
            {info.getValue()}
          </span>
        );
      },
      enableSorting: true,
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: () => (
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs font-medium">
            Ver
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-xs font-medium">
            Editar
          </button>
        </div>
      ),
    }),
  ];

  const handleRowClick = (card: Card) => {
    console.log("Tarjeta seleccionada:", card);
  };

  return (
    <Tabla
      data={mockCards}
      columns={columns}
      onRowClick={handleRowClick}
      emptyMessage="No hay tarjetas registradas"
      isLoading={false}
      striped={true}
      hoverable={true}
      bordered={false}
      compact={false}
    />
  );
};

export default CardsPage;
