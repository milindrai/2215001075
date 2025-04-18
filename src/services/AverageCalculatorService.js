
import { api } from '../lib/api';

export class AverageCalculatorService {
  static instance = null;
  windowSize = 10;
  numbers = [];

  static getInstance() {
    if (!AverageCalculatorService.instance) {
      AverageCalculatorService.instance = new AverageCalculatorService();
    }
    return AverageCalculatorService.instance;
  }

  calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return Number((sum / numbers.length).toFixed(2));
  }

  async getNumbers(type) {
    let endpoint = '';
    switch (type) {
      case 'p': endpoint = '/primes'; break;
      case 'f': endpoint = '/fibo'; break;
      case 'e': endpoint = '/even'; break;
      case 'r': endpoint = '/rand'; break;
    }

    const start = performance.now();
    const response = await api.get(endpoint);
    const end = performance.now();

    if (end - start > 500) {
      throw new Error('Response timeout');
    }

    const newNumbers = response.data.numbers;
    const windowPrevState = [...this.numbers];
    
    this.numbers = [...this.numbers, ...newNumbers]
      .filter((n, i, arr) => arr.indexOf(n) === i)
      .slice(-this.windowSize);

    return {
      windowPrevState,
      windowCurrState: this.numbers,
      numbers: newNumbers,
      avg: this.calculateAverage(this.numbers)
    };
  }
}
