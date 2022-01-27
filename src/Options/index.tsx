import React, { useEffect } from 'react';

const Options: React.VFC = () => {
    useEffect(() => {
        chrome.storage.local.get(['greeting'], (result) => {
            const element = document.querySelector('input');
            element && element.setAttribute('value', result.greeting);
        });
    }, []);

    const save = () => {
        chrome.storage.local.set({
            greeting: document.querySelector('input')?.value || 'Hello',
        });
        alert('保存しました');
    }

    return (
        <div>
            <label htmlFor='greeting'>挨拶: </label>
            <input id='greeting' />
            <button onClick={save}>保存</button>
        </div>
    );
}

export default Options;