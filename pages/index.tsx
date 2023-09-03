import { useCurrentUser } from '@lib/context';
import { Space } from '@prisma/client';
import Spaces from 'components/Spaces';
import WithNavBar from 'components/WithNavBar';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { getEnhancedPrisma } from 'server/db/enhanced';
import {trpc} from '@lib/trpc'
import {toast} from 'react-toastify'
import {PlusIcon} from '@heroicons/react/24/outline'

type Props = {
    spaces: Space[];
};

const Home: NextPage<Props> = ({ spaces }) => {
    const user = useCurrentUser();
    const { mutateAsync: submitSpace } = trpc.spaces.submitSpace.useMutation();

    const _createSpace = async () => {

        try {
            const list = await submitSpace({
                data: {
                    title: 'title',
                    private: false,
                    space: {connect: {id: 'space!.id'}},
                    owner: {connect: {id: 'user!.id'}},
                },
            });

            console.log(`List created: ${list}`);
            return list
        } catch (err: any) {
            toast.error(
                `Failed to create list: ${err.info?.message || err.message}`
            );
            return;
        }
    }
    return (
        <WithNavBar>
            {user && (
                <div className="mt-8 text-center flex flex-col items-center w-full">
                    <h1 className="text-2xl text-gray-800">
                        Welcome {user.name || user.email}!
                    </h1>
                    <div className="w-full p-8">
                        <h2 className="text-lg md:text-xl text-left mb-8 text-gray-700">
                            <button onClick={() => _createSpace()}>
                                <span className="link link-primary"
                                >Submit Space using custom controller</span>
                            </button>
                        </h2>
                        <Spaces spaces={spaces} />
                    </div>
                </div>
            )}
        </WithNavBar>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const db = await getEnhancedPrisma(ctx);
    const spaces = await db.space.findMany();
    return {
        props: { spaces },
    };
};

export default Home;
