import { Iq7Card } from '../../components/Iq7Card';

export function BudgetOverviewPanel({ className }: { className?: string }) {
    return (
        <div className='flex gap-2'>
            <Iq7Card.Subsection className='flex-auto'>
                <Iq7Card.SubsectionTitle>
                    Available Funds
                </Iq7Card.SubsectionTitle>
                <p>$1000</p>
            </Iq7Card.Subsection>
            <Iq7Card.Subsection className='flex-auto flex gap-4'>
                <div>
                    <Iq7Card.SubsectionTitle>
                        Expected Costs
                    </Iq7Card.SubsectionTitle>
                    <p>$1000</p>
                </div>
                <div>
                    <Iq7Card.SubsectionTitle>
                        Remaining Balance
                    </Iq7Card.SubsectionTitle>
                    <p>$1000</p>
                </div>
            </Iq7Card.Subsection>
        </div>
    );
}
