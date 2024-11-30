import {DiscoveryIcon} from "@/public/icons/discovery";
import {Wave} from "@/app/translate/(components)/Wave";
import { TextShimmer } from '@/components/core/text-shimmer';
import {TextEffect} from "@/components/core/text-effect";


const TranslationField = ({
    translation,
    generatedSentence,
    isLoading
}: {
    translation: string,
    generatedSentence: string,
    isLoading: boolean
}) => {
    return (
        <div className={"flex flex-col relative h-full rounded-[20px] items-center py-[40px] space-y-[40px] bg-[#F2F2F2]"}>

            <div className={"font-medium italic text-[20px]"}>
                {isLoading ?
                    <TextShimmer className='' duration={1}>
                        Translating...
                    </TextShimmer>
                    :
                    <TextEffect per='char' preset='fade'>
                        {translation}
                    </TextEffect>
                }
            </div>

            <Wave />

            <div className={"sm:w-[480px] w-[280px] font-medium italic text-[20px]"}>
                {isLoading ?
                    <TextShimmer className='' duration={1}>
                        Generating...
                    </TextShimmer>
                    :
                    <TextEffect per='char' preset='fade'>
                        {generatedSentence}
                    </TextEffect>
                }
            </div>

            <div className={"flex absolute w-[42px] h-[42px] rounded-[16px] bottom-[10px] right-[10px] items-center justify-center bg-white shadow-2xl"}>
                <DiscoveryIcon color={"#0072FF"}/>
            </div>

        </div>
    )
}

export default TranslationField