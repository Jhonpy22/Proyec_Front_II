export interface Producto {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    rating: number;
}

export interface CategoryCard {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    text: string;
    rating: number;
}

export interface Slide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
}