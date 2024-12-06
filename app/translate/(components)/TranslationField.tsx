import {useState, useCallback, useEffect, useRef} from 'react';
import {DiscoveryIcon} from "@/public/icons/discovery";
import {Wave} from "@/app/translate/(components)/Wave";
import { TextShimmer } from '@/components/core/text-shimmer';
import {TextEffect} from "@/components/core/text-effect";
import { PlayIcon, PauseIcon } from 'lucide-react';
import { toast } from 'sonner';

const TranslationField = ({
                              translation,
                              generatedSentence,
                              isLoading
                          }: {
    translation: string,
    generatedSentence: string,
    isLoading: boolean
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioUrlRef = useRef<string | null>(null);

    // Cleanup function for audio resources
    const cleanupAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
    }, []);

    // Generate text to speech
    const generateTextToSpeech = useCallback(async (text: string) => {
        if (!text) {
            toast.error('No text to convert to speech');
            return null;
        }

        // Cleanup previous audio resources
        cleanupAudio();
        setIsGeneratingAudio(true);

        try {
            // Validate text length (ElevenLabs typically has a character limit)
            if (text.length > 5000) {
                toast.error('Text is too long for text-to-speech conversion');
                return null;
            }

            const response = await fetch('/api/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || 'default-voice-id',
                    modelId: "eleven_monolingual_v1"
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate speech');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            audioUrlRef.current = url;
            return url;
        } catch (error) {
            console.error('TTS Generation Error:', error);
            toast.error('Could not generate audio. Please try again.');
            return null;
        } finally {
            setIsGeneratingAudio(false);
        }
    }, [cleanupAudio]);

    // Handle play/pause
    const handlePlayPause = useCallback(async () => {
        // Prevent interactions during loading or audio generation
        if (isLoading || isGeneratingAudio) return;

        try {
            // If no audio exists, generate it
            if (!audioUrlRef.current) {
                const generatedUrl = await generateTextToSpeech(generatedSentence);
                if (!generatedUrl) return;
            }

            // Create audio element if it doesn't exist
            if (!audioRef.current && audioUrlRef.current) {
                audioRef.current = new Audio(audioUrlRef.current);

                // Setup event listeners
                audioRef.current.onended = () => {
                    setIsPlaying(false);
                };
            }

            // Play or pause
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current?.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Audio playback error:', error);
            toast.error('Could not play audio');
            setIsPlaying(false);
        }
    }, [isLoading, isGeneratingAudio, generatedSentence, isPlaying, generateTextToSpeech]);

    // Reset audio when generated sentence changes
    useEffect(() => {
        cleanupAudio();
        setIsPlaying(false);
    }, [generatedSentence, cleanupAudio]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupAudio();
        };
    }, [cleanupAudio]);

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

            {!isLoading && translation && (
                <button
                    onClick={handlePlayPause}
                    disabled={isGeneratingAudio}
                    className={`absolute w-[42px] h-[42px] rounded-[16px] bottom-[10px] right-[10px] flex items-center justify-center bg-white shadow-2xl 
                        ${isGeneratingAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isGeneratingAudio ? (
                        <span className="text-xs text-blue-500">...</span>
                    ) : (
                        isPlaying ? <PauseIcon color="#0072FF" /> : <PlayIcon color="#0072FF" />
                    )}
                </button>
            )}

            {!isLoading && (
                <div className={"flex absolute w-[42px] h-[42px] rounded-[16px] bottom-[10px] left-[10px] items-center justify-center bg-white shadow-2xl"}>
                    <DiscoveryIcon color={"#0072FF"}/>
                </div>
            )}
        </div>
    )
}

export default TranslationField