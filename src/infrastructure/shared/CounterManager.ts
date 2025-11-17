export class CounterManager {

    private static counterMap = new Map<string, { value: number, init: boolean}>() 
    
    public static init(name: string) {

        const init = this.counterMap.get(name)?.init

        if (!init)
            this.counterMap.set(name, { value: 0, init: true})

    }

    public static reset(name: string) {

        this.counterMap.set(name, { value: 0, init: false})

    }

    public static add(name: string) {

        const p = this.counterMap.get(name)

        if (!p)
            return -1
            
        const newValue = p.value + 1

        this.counterMap.set(name, { value: newValue, init: p.init})

        return newValue

    }

}