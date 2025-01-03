export function ApiReference() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">
        API Reference
      </h2>
      <div className="prose prose-gray max-w-none">
        <h3 className="text-xl font-semibold mt-6 mb-3">Options</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              onSelectionChange?: (selection: TextSelection) =&gt; void
            </code>{' '}
            - Callback fired when selection changes
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              offsetLeft?: number
            </code>{' '}
            - Horizontal offset for tooltip positioning (default: 4)
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              offsetTop?: number
            </code>{' '}
            - Vertical offset for tooltip positioning (default: 8)
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Return Value</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              selectedText: string | null
            </code>{' '}
            - The currently selected text
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              position: Position | null
            </code>{' '}
            - Coordinates for positioning the tooltip
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              isSelected: boolean
            </code>{' '}
            - Whether text is currently selected
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">
              element: HTMLElement | null
            </code>{' '}
            - The element containing the selection
          </li>
        </ul>
      </div>
    </section>
  );
}
