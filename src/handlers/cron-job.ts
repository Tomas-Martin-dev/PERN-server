import cron from 'node-cron';
cron.schedule('*/10 * * * *', () => {
    const currentTime = new Date().toISOString();
    console.log(`[Cron Job] Hora actual: ${currentTime}`);
});
export function initCronJob(): void {
    console.log('Cron job inicializado - se ejecutará cada 10 minutos');
  }