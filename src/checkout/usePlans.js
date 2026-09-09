import { useEffect, useState } from 'react';
import * as checkoutApi from './api';

/**
 * Plans, durations and their discounts — all from the server.
 *
 * The pricing page used to hardcode "Save 5% / 10% / 20%" badges while the
 * server charged full price for 3 and 6 months. Reading both the price and the
 * discount from one endpoint means the badge and the amount cannot drift apart
 * again.
 */
export function usePlans() {
  const [state, setState] = useState({
    loading: true,
    error: '',
    byCode: {},
    durations: [],
    enabled: true,
    slaHours: 12,
    support: '',
  });

  useEffect(() => {
    let active = true;
    checkoutApi.getPlans()
      .then((data) => {
        if (!active) return;
        const byCode = {};
        (data.plans || []).forEach((p) => { byCode[p.code] = p; });
        setState({
          loading: false,
          error: '',
          byCode,
          durations: data.durations || [],
          enabled: !!data.enabled,
          slaHours: data.sla_hours || 12,
          support: data.support || '',
        });
      })
      .catch((err) => {
        if (!active) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: err.message || 'Could not load pricing.',
        }));
      });
    return () => { active = false; };
  }, []);

  /** Total for a plan and duration, computed the same way the server does. */
  const priceFor = (planCode, months) => {
    const plan = state.byCode[planCode];
    if (!plan) return null;
    const monthly = Number(plan.monthly_price) || 0;
    if (monthly <= 0) return 0;
    const d = state.durations.find((x) => x.months === months);
    const percent = d ? d.discount_percent : 0;
    return Math.round(monthly * months * (100 - percent) / 100);
  };

  const discountFor = (months) => {
    const d = state.durations.find((x) => x.months === months);
    return d ? d.discount_percent : 0;
  };

  return { ...state, priceFor, discountFor };
}
