'use client';
import { Iq7Button } from '@/src/components/Iq7Button';
import { useFundingSources } from '@/src/features/budget-funds/hooks/useFundingSources';
import dayjs from 'dayjs';
import { Iq7Table } from '../../../components/Iq7Table';

export function AvailableFundsByWeekList() {
    const { fundingSources } = useFundingSources();

    //get the total amount available each week for the next 12 weeks
    const totalFundsByWeek = Array.from(Array(30).keys()).map((i) => {
        const weekStart = dayjs().add(i, 'week').startOf('week');
        const weekEnd = dayjs().add(i, 'week').endOf('week');
        const total = fundingSources.reduce((acc, source) => {
            if (source.takeEffectDate?.isBefore(weekEnd)) {
                if (source.use_recurrence) {
                    const elapsedPeriods =
                        source.recurrence_end &&
                        weekEnd.isAfter(source.recurrence_end)
                            ? source.recurrence_end?.diff(
                                  source.takeEffectDate,
                                  source.recurrence_unit
                              )
                            : weekEnd.diff(
                                  source.takeEffectDate,
                                  source.recurrence_unit
                              );
                    acc += Number(source.amount) * elapsedPeriods;
                } else acc += Number(source.amount);
            }
            return acc;
        }, 0);
        return {
            weekStart,
            weekEnd,
            total,
        };
    });

    return (
        <Iq7Table>
            <Iq7Table.HeadRow>
                <th>Week Of</th>
                <th>Starting Funds</th>
                <th>Payments</th>
            </Iq7Table.HeadRow>
            <Iq7Table.Body>
                {totalFundsByWeek.map((week) => (
                    <Iq7Table.Row key={week.weekStart.toString()}>
                        <td>{week.weekStart.format('MMM D')}</td>
                        <td className='text-right'>{week.total}</td>
                        <td>
                            <Iq7Button>Plan a Payment</Iq7Button>
                        </td>
                    </Iq7Table.Row>
                ))}
            </Iq7Table.Body>
        </Iq7Table>
    );
}
