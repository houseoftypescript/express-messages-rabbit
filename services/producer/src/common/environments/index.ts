const RABBIT_URL = process.env.RABBIT_URL || '';
const RABBIT_QUEUE = process.env.RABBIT_QUEUE || 'rabbit-queue';

export default { rabbit: { url: RABBIT_URL, queue: RABBIT_QUEUE } };
