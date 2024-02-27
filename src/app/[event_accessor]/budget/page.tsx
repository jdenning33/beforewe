import { Iq7Card } from '@/src/components/Iq7Card';
import { Iq7PageTitle } from '@/src/components/Iq7PageTitle';
import Link from 'next/link';

export default function BudgetPage() {
    return (
        <div>
            <Iq7PageTitle>Event Budget</Iq7PageTitle>
            <div>Where would you like to start?</div>
            <div className='flex gap-4'>
                <Link href='./budget/funds'>
                    <Iq7Card>
                        <Iq7Card.Title>Wedding Funds</Iq7Card.Title>
                        <Iq7Card.Body>
                            <p>
                                Track the money that you have available to spend
                                for your wedding.
                            </p>
                        </Iq7Card.Body>
                    </Iq7Card>
                </Link>
                <Link href='./budget/expenses'>
                    <Iq7Card>
                        <Iq7Card.Title>Wedding Budget</Iq7Card.Title>
                        <Iq7Card.Body>
                            <p>
                                Track the expected and actual costs for your
                                wedding as well as payments you've already made.
                            </p>
                        </Iq7Card.Body>
                    </Iq7Card>
                </Link>
            </div>
        </div>
    );
}
