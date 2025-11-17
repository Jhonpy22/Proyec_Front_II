import Tabla from "../hooks/tabla";

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
      holderName: "Patricia Rojas Méndez",
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
    {
      key: "cardNumber",
      header: "Número de Tarjeta",
      sortable: true,
      render: (card: Card) => (
        <span className="font-mono font-semibold text-gray-800">
          {card.cardNumber}
        </span>
      ),
    },
    {
      key: "holderName",
      header: "Titular",
      sortable: true,
      render: (card: Card) => (
        <div>
          <div className="font-semibold text-gray-800">{card.holderName}</div>
          <div className="text-xs text-gray-500">{card.bank}</div>
        </div>
      ),
    },
    {
      key: "balance",
      header: "Saldo Disponible",
      sortable: true,
      render: (card: Card) => (
        <div>
          <div className="font-bold text-green-600">
            ₡{card.balance.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            de ₡{card.creditLimit.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      key: "expirationDate",
      header: "Vencimiento",
      sortable: true,
      className: "text-center",
    },
    {
      key: "status",
      header: "Estado",
      sortable: true,
      render: (card: Card) => {
        const statusColors: Record<string, string> = {
          Activa: "bg-green-100 text-green-800 border-green-300",
          Bloqueada: "bg-red-100 text-red-800 border-red-300",
          Vencida: "bg-gray-100 text-gray-800 border-gray-300",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              statusColors[card.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {card.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Acciones",
      render: () => (
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs font-medium">
            Ver
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-xs font-medium">
            Editar
          </button>
        </div>
      ),
    },
  ];

  const handleRowClick = (card: Card) => {
    console.log("Tarjeta seleccionada:", card);
  };

  const handleAddCard = () => {
    console.log("Agregar nueva tarjeta");
  };

  const handleExport = () => {
    console.log("Exportar datos");
  };

  return (
    <Tabla
      data={mockCards}
      columns={columns}
      title="Gestión de Tarjetas de Crédito"
      onRowClick={handleRowClick}
      emptyMessage="No hay tarjetas registradas"
      isLoading={false}
      striped={true}
      hoverable={true}
      bordered={false}
      compact={false}
      actions={[
        {
          label: "Agregar Tarjeta",
          onClick: handleAddCard,
          variant: "primary",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          ),
        },
        {
          label: "Exportar",
          onClick: handleExport,
          variant: "secondary",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          ),
        },
      ]}
    />
  );
};

export default CardsPage;
