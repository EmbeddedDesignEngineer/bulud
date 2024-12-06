// app/api/text-to-speech/route.ts
import { NextRequest, NextResponse } from 'next/server';


const ELEVENLABS_API_KEY='sk_fd0962fcc4a68c670206d4279bc964062c08fffc50573d5e'


export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body
        const { text, modelId } = await request.json();

        // Validate input
        if (!text) {
            return NextResponse.json(
                { message: 'Text is required' },
                { status: 400 }
            );
        }

        // Validate API key
        const apiKey = ELEVENLABS_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { message: 'ElevenLabs API key is not configured' },
                { status: 500 }
            );
        }

        // Make request to ElevenLabs API
        const elevenLabsResponse = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${'21m00Tcm4TlvDq8ikWAM'}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: modelId || "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5
                    }
                })
            }
        );

        // Check if the ElevenLabs API call was successful
        if (!elevenLabsResponse.ok) {
            const errorBody = await elevenLabsResponse.text();
            console.error('ElevenLabs API Error:', errorBody);
            return NextResponse.json(
                { message: 'Failed to generate audio' },
                { status: elevenLabsResponse.status }
            );
        }

        // Convert the response to a buffer
        const audioBuffer = await elevenLabsResponse.arrayBuffer();

        // Return the audio as a response
        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename=speech.mp3'
            }
        });

    } catch (error) {
        console.error('Text-to-Speech Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}