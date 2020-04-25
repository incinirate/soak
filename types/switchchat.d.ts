declare module 'switchchat' {
    export namespace SwitchChat {
        enum ChatMode {
            MARKDOWN = "markdown",
            FORMAT = "format"
        }

        enum Channel {
            CHAT = "chat",
            DISCORD = "discord"
        }

        enum CLOSE_REASON {
            SERVER_STOPPING = 4000,
            EXTERNAL_GUESTS_NOT_ALLOWED = 4001,
            UNKNOWN_LICENCE_KEY = 4002,
            INVALID_LICENCE_KEY = 4003,
            DISABLED_LICENCE_KEY = 4004,
            CHANGED_LICENCE_KEY = 4005,
        }

        type FormattedText = unknown; // TODO

        interface Player {
            type: string;
            name: string;
            uuid: string;
            displayName: string;
            displayNameFormatted: FormattedText;
            world: string;
            group: string;
            tell(message: string, label: string, prefix: string, mode: ChatMode): Promise<unknown>;
        }

        // interface ChatMessage {
        //     text: string;
        //     rawText: string;
        //     renderedText: FormattedText;
        //     channel: Channel.CHAT;
        //     time: Date;
        //     edited: boolean;
        //     user: Player;
        // }


        class Client {
            constructor(license: string);

            connect(): Promise<void>;

            // on(event: 'chat', callback: (message: ChatMessage) => void): void;
            getPlayers(): IterableIterator<Player>;
        }
    }

    export default SwitchChat;
}
