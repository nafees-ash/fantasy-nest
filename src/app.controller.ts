import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Controller()
export class AppController {
  @Get()
  async getHello(@Req() request: Request): Promise<string> {
    try {
      const ip = await this.getIp(request);
      return `Friend you are being watched. Your IP: ${ip}`;
    } catch (error) {
      console.error('Error getting IP:', error);
      return 'hello friend, we had trouble identifying you';
    }
  }

  private async getIp(request: Request): Promise<string> {
    try {
      const headerIp = this.getPublicIpAddress(request);
      if (headerIp !== 'Unknown') {
        return headerIp;
      }

      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching public IP:', error);
      throw error;
    }
  }

  private getPublicIpAddress(request: Request): string {
    const ipHeaders = [
      'x-client-ip',
      'x-forwarded-for',
      'cf-connecting-ip',
      'fastly-client-ip',
      'x-real-ip',
      'x-cluster-client-ip',
      'x-forwarded',
      'forwarded-for',
      'forwarded',
    ];

    for (const header of ipHeaders) {
      const value = request.headers[header] as string | string[] | undefined;
      if (value) {
        const ip = Array.isArray(value) ? value[0] : value.split(',')[0];
        return this.cleanIpAddress(ip);
      }
    }

    return 'Unknown';
  }

  private cleanIpAddress(ip: string): string {
    return ip.replace(/^::ffff:/, '').replace(/[^\d\.]/g, '');
  }
}
