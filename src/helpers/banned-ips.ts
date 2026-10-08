import { z } from 'zod';

const info = z.object({
  ip: z.string(),
  malicious_requests: z.number(),
});

type InfoType = z.infer<typeof info>;

function buildIpMap(): Map<string, InfoType> {
  const newMap = new Map();
  return newMap;
}

const ipBlacklistMap = buildIpMap();

export function checkBlacklistedIps(ip: string) {
  const status = ipBlacklistMap.get(ip);
  if (status && status.malicious_requests > 2) {
    return status;
  }
}

export function updateMaliciousRequestAddress(ip: string) {
  const status = ipBlacklistMap.get(ip);
  if (!status) {
    const newIp = { ip: ip, malicious_requests: 1 };
    ipBlacklistMap.set(ip, { ...newIp });
    return newIp;
  } else {
    status.malicious_requests += 1;
    ipBlacklistMap.set(ip, { ...status });
    return status;
  }
}
