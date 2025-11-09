export interface CreditCard {
    id: string;
    cardNumber: string;
    holderName: string;
    balance: number;
    initialBalance?: number;
    expirationDate?: string;
    cardType?: 'debit' | 'credit';
    isActive: boolean;
    lastTransaction?: {
        amount: number;
        date: Date;
        description?: string;
    };
}

export interface SimulationStatus {
    isRunning: boolean;
    startedAt?: Date;
    cards: CreditCard[];
    totalSpent?: number;
    transactionsCount?: number;
}

export interface StartSimulationRequest {
    cards: string[];
}

export interface StartSimulationResponse {
    success: boolean;
    message: string;
    simulationId?: string;
}

export interface StopSimulationResponse {
    success: boolean;
    message: string;
    finalStatus?: {
        totalSpent: number;
        transactionsCount: number;
        duration: number;
    };
}

export interface CardUpdate {
    cardId: string;
    newBalance: number;
    transaction?: {
        amount: number;
        description: string;
    };
}