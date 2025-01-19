import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormattingService {

    constructor() { }

    public formatter(value: number | null | ''): string {
        if (value === null || value === undefined || value === '') {
            return '';
        } else if (typeof value !== 'number') {
            return value;
        }

        return `${value.toFixed(2).replace('.', ',')}`;
    }

    public parser(value: string): number {
        const cleanedValue = value.replace(',', '.');
        return parseFloat(cleanedValue);
    }

    public integerFormatter(value: number | null | ''): string {
        if (value === null || value === undefined || value === '') {
            return '';
        } else if (typeof value !== 'number') {
            return value;
        }

        return `${Math.floor(value)}`;
    }

    public integerParser(value: string): string {
        const cleanedValue = value.replace(',', '.').split('.')[0];
        return cleanedValue;
    }

    public longFormatter(value: number | null | ''): string {
        if (value === null || value === undefined || value === '') {
            return '';
        } else if (typeof value !== 'number') {
            return value;
        }

        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    public longParser(value: string): string {
        return value
            .replace(/\./g, '')
            .replace(',', '.');
    }

}
