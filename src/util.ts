type Child = Node | string | number | null | undefined | false | Child[]
type Props = Record<string, any>

// querySelector util
export function querySelector<K extends keyof HTMLElementTagNameMap>(
	selectors: K
): HTMLElementTagNameMap[K]
export function querySelector<K extends keyof SVGElementTagNameMap>(
	selectors: K
): SVGElementTagNameMap[K]
export function querySelector<K extends keyof MathMLElementTagNameMap>(
	selectors: K
): MathMLElementTagNameMap[K]
export function querySelector<E extends Element = Element>(selectors: string): E
export function querySelector(selectors: string): Element
{
	const e = document.querySelector(selectors)
	if (!e) throw new Error(`Couldn't find HTML element with provided selectors: "${selectors}"`)
	return e
}

// querySelectorAll util
export function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
	selectors: K
): NodeListOf<HTMLElementTagNameMap[K]>
export function querySelectorAll<K extends keyof SVGElementTagNameMap>(
	selectors: K
): NodeListOf<SVGElementTagNameMap[K]>
export function querySelectorAll<K extends keyof MathMLElementTagNameMap>(
	selectors: K
): NodeListOf<MathMLElementTagNameMap[K]>
export function querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>
export function querySelectorAll(selectors: string): NodeListOf<Element>
{
	const e = document.querySelectorAll(selectors)
	if (e.length === 0)
		throw new Error(`Couldn't find HTML elements with provided selectors: "${selectors}"`)
	return e
}

// h element creator
export function h<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	props?: Props,
	...children: Child[]
): HTMLElementTagNameMap[K]
// defaults to HTMLElement if the tag isn't natively mapped or if T is omitted.
export function h<T extends Element = HTMLElement>(
	tag: string,
	props?: Props,
	...children: Child[]
): T
export function h(tag: string, props: Props = {}, ...children: Child[]): Element
{
	const el = document.createElement(tag)

	// a for...in loop prevents the memory allocation of Object.entries()
	for (const key in props)
	{
		const value = props[key]
		if (value === null || value === undefined || value === false) continue

		if (key === 'class' || key === 'className') el.setAttribute('class', value)
		else if (key === 'style' && typeof value === 'object') Object.assign(el.style, value)
		else if (key.startsWith('on') && typeof value === 'function')
			el.addEventListener(key.slice(2).toLowerCase(), value as EventListener)
		else if (key === 'html') el.innerHTML = value
		else el.setAttribute(key, value)
	}

	// A custom recursive appender is significantly faster than .flat(Infinity)
	// because it avoids creating massive intermediate arrays in memory.
	const appendChildren = (kids: Child[]) =>
	{
		for (const child of kids)
		{
			if (child === null || child === undefined || child === false) continue

			if (Array.isArray(child)) appendChildren(child)
			else
			{
				el.appendChild(
					child instanceof Node ? child : document.createTextNode(String(child))
				)
			}
		}
	}

	appendChildren(children)

	return el
}
