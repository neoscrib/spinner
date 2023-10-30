// noinspection JSUnusedGlobalSymbols,JSValidateJSDoc
// tslint:disable:max-classes-per-file
// tslint:disable:no-namespace
// tslint:disable:ban-types
// tslint:disable:member-ordering
// tslint:disable:unified-signatures

declare module '2a' {
    export import Lz  = twoa.Lz;
    export import BinarySearch = twoa.BinarySearch;
    export import Comparator = twoa.Comparator;
    export import SortedMap = twoa.SortedMap;
    export import StringBuilder = twoa.StringBuilder;
    export import FilenameUtils = twoa.FilenameUtils;
}

declare module '2a/geometry' {
    export import BoundingBox = twoa.geometry.BoundingBox;
    export import BoundingSphere = twoa.geometry.BoundingSphere;
    export import Matrix = twoa.geometry.Matrix;
    export import Quaternion = twoa.geometry.Quaternion;
    export import Vector3 = twoa.geometry.Vector3;
}

declare module '2a/client' {
    export import bodyParam = twoa.client.bodyParam;
    export import client = twoa.client.client;
    export import mapping = twoa.client.mapping;
    export import headerParam = twoa.client.headerParam;
    export import pathParam = twoa.client.pathParam;
    export import formParam = twoa.client.formParam;
    export import queryParam = twoa.client.queryParam;
    export import init = twoa.client.init;
    export import HttpMethod = twoa.client.HttpMethod;
}

declare module '2a/di' {
    export import Application = twoa.di.Application;
    export import autowire = twoa.di.autowire;
    export import inject = twoa.di.inject;
    export import service = twoa.di.service;
}

declare module '2a/scheduling' {
    export import scheduled = twoa.scheduling.scheduled;
    export import enableScheduling = twoa.scheduling.enableScheduling;
    export import disableScheduling = twoa.scheduling.disableScheduling;
    export import interval = twoa.scheduling.interval;
}

declare module '2a/util' {
    export import Color = twoa.util.Color;
    export import MathHelper = twoa.util.MathHelper;
    export import NamesGenerator = twoa.util.NamesGenerator;
    export import TextMatching = twoa.util.TextMatching;
    export import createUrl = twoa.util.createUrl;
    export import downloadFile = twoa.util.downloadFile;
    export import blobToObject = twoa.util.blobToObject;
    export import blobToString = twoa.util.blobToString;
    export import uuid = twoa.util.uuid;
}

declare namespace twoa {
    export type LzIterable<T> = IterableIterator<T> | T[];

    export type ComparatorFunction<T> = (a: T, b: T) => number;

    export type IdentityFunction<T> = (item: T) => T;
    export type PredicateFunction<T> = (item: T, index: number) => boolean;
    export type SelectorFunction<T, U> = (item: T, index: number) => U;
    export type SelectorFunctionNoIndex<T, U> = (item: T) => U;
    export type AccumulatorFunction<T, U> = (accumulator: U, item: T, index: number) => U;
    export type Action<T> = SelectorFunction<T, void>;

    export class BinarySearch {
        public static find<T>(source: T[], index: number, length: number, item: T, comparator?: (a: T, b: T) => number): number;
    }

    export class Comparator {
        public static defaultComparator<T>(a: T, b: T): number;
        public static comparing<T, U>(selector: SelectorFunctionNoIndex<T, U> | keyof T): ComparatorFunction<T>;
        public static selector<T, U>(selector: keyof T): SelectorFunctionNoIndex<T, U>;
    }

    export class Lz<T> implements IterableIterator<T> {
        public static identityFunction<T>(item: T): T;

        /**
         * Returns the input typed as LzIterable<T>.
         * @returns {IterableIterator<T>} The input sequence typed as LzIterable<T>.
         */
        public toIterable(): Lz<T>;

        /**
         * Returns the input typed as LzIterable<T>.
         * @param {LzIterable<T>} source The sequence to type as LzIterable<T>.
         * @returns {IterableIterator<T>} The input sequence typed as LzIterable<T>.
         */
        public static toIterable<T>(source: LzIterable<T>): Lz<T>;

        /**
         * Appends a value to the end of the sequence.
         * @param {T[]} elements The value(s) to append to source.
         * @returns {Lz<T>} A new sequence that ends with element.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public append(...elements: T[]): Lz<T>;

        /**
         * Appends a value to the end of the sequence.
         * @param {LzIterable<T>} source A sequence of values.
         * @param {T[]} elements The value(s) to append to source.
         * @returns {Lz<T>} A new sequence that ends with element.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static append<T>(source: LzIterable<T>, ...elements: T[]): Lz<T>;

        /**
         * Adds a value to the beginning of the sequence.
         * @param {T[]} elements The value(s) to prepend to <i>source</i>.
         * @returns {Lz<T>} A new sequence that begins with <i>element</i>.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public prepend(...elements: T[]): Lz<T>;

        /**
         * Adds a value to the beginning of the sequence.
         * @param {LzIterable<T>} source A sequence of values.
         * @param {T[]} elements The value(s) to prepend to <i>source</i>.
         * @returns {Lz<T>} A new sequence that begins with <i>element</i>.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static prepend<T>(source: LzIterable<T>, ...elements: T[]): Lz<T>;

        /**
         * Concatenates two sequences.
         * @param {LzIterable<T>} second The sequence to concatenate to the first sequence.
         * @returns {Lz<T>} A sequence that contains the concatenated elements of the two input sequences.
         */
        public concat(second: LzIterable<T>): Lz<T>;

        /**
         * Returns the elements of the specified sequence or the specified value as a singleton collection if the
         * sequence is empty.
         * @param {T} defaultValue The value to return if the sequence is empty.
         * @returns {Lz<T>} A sequence that contains <i>defaultValue</i> if <i>source</i> is empty; otherwise,
         * <i>source</i>
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public defaultIfEmpty(defaultValue: T): Lz<T>;

        /**
         * Returns the elements of the specified sequence or the specified value as a singleton collection if the sequence
         * is empty.
         * @param {LzIterable<T>} source The sequence to return the specified value for if it is empty.
         * @param {T} defaultValue The value to return if the sequence is empty.
         * @returns {Lz<T>} A sequence that contains <i>defaultValue</i> if <i>source</i> is empty; otherwise,
         * <i>source</i>.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static defaultIfEmpty<T>(source: LzIterable<T>, defaultValue: T): Lz<T>;

        /**
         * Produces the symmetrical set difference of two sequences by using the specified <i>ComparatorFunction<T></i> to
         * compare values.
         * @param {LzIterable<T>} second A sequence whose elements that also occur in the first sequence will
         * cause those elements to be removed from the returned sequence.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the symmetrical set difference of the elements of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public disjunctive(second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Produces the symmetrical set difference of two sequences by using the specified <i>ComparatorFunction<T></i> to
         * compare values.
         * @param {LzIterable<T>} first A sequence whose elements that also occur in the second sequence will
         * cause those elements to be removed from the returned sequence.
         * @param {LzIterable<T>} second A sequence whose elements that also occur in the first sequence will
         * cause those elements to be removed from the returned sequence.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the symmetrical set difference of the elements of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static disjunctive<T>(first: LzIterable<T>, second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Returns distinct elements from a sequence by using a specified ComparatorFunction<T> to compare values.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains distinct elements from the source sequence.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public distinct(comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Returns distinct elements from a sequence by using a specified ComparatorFunction<T> to compare values.
         * @param {LzIterable<T>} source The sequence to remove duplicate elements from.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains distinct elements from the source sequence.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static distinct<T>(source: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Returns an empty sequence that has the specified type argument.
         * @returns {Lz<T>} An empty sequence whose type argument is <i>T</i>.
         */
        public static empty<T>(): Lz<T>;

        /**
         * Produces the set difference of two sequences by using the specified <i>ComparatorFunction<T></i> to compare
         * values.
         * @param {LzIterable<T>} second A sequence whose elements that also occur in the first sequence will
         * cause those elements to be removed from the returned sequence.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the set difference of the elements of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public except(second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Produces the set difference of two sequences by using the specified <i>ComparatorFunction<T></i> to compare
         * values.
         * @param {LzIterable<T>} first A sequence whose elements that are not also in <i>second</i> will be
         * returned.
         * @param {LzIterable<T>} second A sequence whose elements that also occur in the first sequence will
         * cause those elements to be removed from the returned sequence.
         * @param {ComparatorFunction<T>} comparator Optional. A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the set difference of the elements of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static except<T>(first: LzIterable<T>, second: LzIterable<T>,
                                comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Performs the specified action on each element of the sequence.
         * @param {Action<T>>} action The action delegate to perform on each element of the sequence.
         */
        public forEach(action: Action<T>): void;

        /**
         * Performs the specified action on each element of the sequence.
         * @param {LzIterable<T>} source The sequence whose elements to perform the specified action on.
         * @param {Action<T>>} action The action delegate to perform on each element of the sequence.
         */
        public static forEach<T>(source: LzIterable<T>, action: Action<T>): void;

        /**
         * Inserts a value into the source sequence at the specified index.
         * @param {T} element The value to insert to <i>source</i>.
         * @param {number} index The index at which to insert <i>element</i>.
         * @returns {Lz<T>} A new sequence that contains <i>element</i> at <i>index</i>.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public insert(element: T, index: number): Lz<T>;

        /**
         * Inserts a value into the source sequence at the specified index.
         * @param {LzIterable<T>} source The sequence to remove duplicate elements from.
         * @param {T} element The value to insert to <i>source</i>.
         * @param {number} index The index at which to insert <i>element</i>.
         * @returns {Lz<T>} A new sequence that contains <i>element</i> at <i>index</i>.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static insert<T>(source: LzIterable<T>, element: T, index: number): Lz<T>;

        /**
         * Produces the set intersection of two sequences.
         * @param {LzIterable<T>} second A sequence whose distinct elements that also appear in the first sequence will be returned.
         * @param {ComparatorFunction<T>} comparator A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the elements that form the set intersection of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public intersect(second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Produces the set intersection of two sequences.
         * @param {LzIterable<T>} first A sequence whose distinct elements that also appear in <i>second</i>
         * will be returned.
         * @param {LzIterable<T>} second A sequence whose distinct elements that also appear in the first sequence will be returned.
         * @param {ComparatorFunction<T>} comparator A ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the elements that form the set intersection of two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static intersect<T>(first: LzIterable<T>, second: LzIterable<T>,
                                   comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Correlates the elements of two sequences based on matching keys.
         * @param {IterableIterator<T2> | T2[]} inner The sequence to join to the first sequence.
         * @param {SelectorFunction<T, K>} outerKeySelector A function to extract the join key from each element of the first sequence.
         * @param {SelectorFunction<T2, K>} innerKeySelector A function to extract the join key from each element of the second sequence.
         * @param {(a: T, b: T2) => U} resultSelector A function to create a result element from two matching elements.
         * @returns {Lz<U>} A sequence that has elements of type <i>U</i> that are obtained by performing an inner
         * join on two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public join<T2, K, U>(inner: IterableIterator<T2> | T2[],
                              outerKeySelector: SelectorFunction<T, K>,
                              innerKeySelector: SelectorFunction<T2, K>,
                              resultSelector: (a: T, b: T2) => U): Lz<U>;

        /**
         * Correlates the elements of two sequences based on matching keys.
         * @param {IterableIterator<T1> | T1[]} outer The first sequence to join.
         * @param {IterableIterator<T2> | T2[]} inner The sequence to join to the first sequence.
         * @param {SelectorFunction<T1, K>} outerKeySelector A function to extract the join key from each element of the first sequence.
         * @param {SelectorFunction<T2, K>} innerKeySelector A function to extract the join key from each element of the second sequence.
         * @param {(a: T1, b: T2) => U} resultSelector A function to create a result element from two matching elements.
         * @returns {Lz<U>} A sequence that has elements of type <i>U</i> that are obtained by performing an inner
         * join on two sequences.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static join<T1, T2, K, U>(outer: IterableIterator<T1> | T1[], inner: IterableIterator<T2> | T2[],
                                         outerKeySelector: SelectorFunction<T1, K>,
                                         innerKeySelector: SelectorFunction<T2, K>,
                                         resultSelector: (a: T1, b: T2) => U): Lz<U>;

        /**
         * Returns the last element of a sequence.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The value at the last position in the source sequence.
         * @throws If the source sequence contains no elements or the predicate did not match any elements.
         */
        public last(predicate?: PredicateFunction<T>): T;

        /**
         * Returns the last element of a sequence.
         * @param {LzIterable<T>} source A sequence to return the last element of.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The value at the last position in the source sequence.
         * @throws If the source sequence contains no elements or the predicate did not match any elements.
         */
        public static last<T>(source: LzIterable<T>, predicate?: PredicateFunction<T>): T;

        /**
         * Returns the last element of a sequence, or a default value if no element is found.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The value at the last position in the source sequence.
         */
        public lastOrDefault(defaultValue: T, predicate?: PredicateFunction<T>): T;

        /**
         * Returns the last element of a sequence, or a default value if no element is found.
         * @param {LzIterable<T>} source A sequence to return the last element of.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The value at the last position in the source sequence.
         */
        public static lastOrDefault<T>(source: LzIterable<T>, defaultValue: T,
                                       predicate?: PredicateFunction<T>): T;

        /**
         * Sorts the elements of a sequence in ascending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public orderBy<V>(selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending or descending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {Lz<T>} A sequence whose elements are sorted according to a key.
         */
        public orderBy<V>(selector: SelectorFunctionNoIndex<T, V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public orderBy<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending or descending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {Lz<T>} A sequence whose elements are sorted according to a key.
         */
        public orderBy<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending order according to a key.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public static orderBy<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending or descending order according to a key.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {Lz<T>} A sequence whose elements are sorted according to a key.
         */
        public static orderBy<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending order by using a specified comparator.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public static orderBy<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in ascending or descending order by using a specified comparator.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {Lz<T>} A sequence whose elements are sorted according to a key.
         */
        public static orderBy<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in descending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public orderByDescending<V>(selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in descending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public orderByDescending<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in descending order according to a key.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public static orderByDescending<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Sorts the elements of a sequence in descending order by using a specified comparator.
         * @param {LzIterable<T>} source A sequence of values to order.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public static orderByDescending<T, V>(source: LzIterable<T>, selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;

        /**
         * Generates a sequence of integral numbers within a specified range.
         * @param {number} start The value of the first integer in the sequence.
         * @param {number} count The number of sequential integers to generate.
         * @returns {Lz<number>} A sequence that contains a range of sequential integral numbers.
         * @throws If count is less than 0.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static range(start: number, count: number): Lz<number>;

        /**
         * Generates a sequence that contains one repeated value.
         * @param {T} element The value to be repeated.
         * @param {number} count The number of times to repeat the value in the generated sequence.
         * @returns {Lz<T>} A sequence that contains a repeated value.
         * @throws If count is less than 0.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static repeat<T>(element: T, count: number): Lz<T>;

        /**
         * Inverts the order of the elements in a sequence.
         * @returns {Lz<T>} A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        public reverse(): Lz<T>;

        /**
         * Inverts the order of the elements in a sequence.
         * @param {LzIterable<T>} source A sequence of values to reverse.
         * @returns {Lz<T>} A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        public static reverse<T>(source: LzIterable<T>): Lz<T>;

        /**
         * Determines whether two sequences are equal by comparing their elements by using a specified
         * ComparatorFunction<T>.
         * @param {LzIterable<T>} second A sequence to compare to the first sequence.
         * @param {ComparatorFunction<T>} comparator A ComparatorFunction<T> to use to compare elements.
         * @returns {boolean} <i>true</i> if the two source sequences are of equal length and their corresponding elements
         * compare equal according to <i>comparator</i>; otherwise, <i>false</i>.
         */
        public sequenceEqual(second: LzIterable<T>, comparator?: ComparatorFunction<T>): boolean;

        /**
         * Determines whether two sequences are equal by comparing their elements by using a specified
         * ComparatorFunction<T>.
         * @param {LzIterable<T>} first A sequence to compare to <i>second</i>.
         * @param {LzIterable<T>} second A sequence to compare to the first sequence.
         * @param {ComparatorFunction<T>} comparator A ComparatorFunction<T> to use to compare elements.
         * @returns {boolean} <i>true</i> if the two source sequences are of equal length and their corresponding elements
         * compare equal according to <i>comparator</i>; otherwise, <i>false</i>.
         */
        public static sequenceEqual<T>(first: LzIterable<T>, second: LzIterable<T>,
                                       comparator?: ComparatorFunction<T>): boolean;

        /**
         * Concatenates two sequences.
         * @param {LzIterable<T>} first The first sequence to concatenate.
         * @param {LzIterable<T>} second The sequence to concatenate to the first sequence.
         * @returns {Lz<T>} A sequence that contains the concatenated elements of the two input sequences.
         */
        public static concat<T>(first: LzIterable<T>, second: LzIterable<T>): Lz<T>;

        /**
         * Filters a sequence of values based on a predicate.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition. Return true to keep the
         * element, false otherwise.
         * @returns {Lz<T>} An iterable that contains elements from the input sequence that satisfy the condition.
         */
        public where(predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Filters a sequence of values based on a predicate.
         * @param {LzIterable<T>} source An iterable to filter.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition. Return true to keep the
         * element, false otherwise.
         * @returns {Lz<T>} An iterable that contains elements from the input sequence that satisfy the condition.
         */
        public static where<T>(source: LzIterable<T>, predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Projects each element of a sequence into a new form.
         * @param {SelectorFunction<T, U>} selector A transform function to apply to each element.
         * @returns {Lz<U>} An iterable whose elements are the result of invoking the transform function on each element of source.
         */
        public select<U>(selector: SelectorFunction<T, U>): Lz<U>;

        /**
         * Projects each element of a sequence into a new form.
         * @param {LzIterable<T>} source An iterable of values to invoke a transform function on.
         * @param {SelectorFunction<T, U>} selector A transform function to apply to each element.
         * @returns {Lz<U>} An iterable whose elements are the result of invoking the transform function on each element of source.
         */
        public static select<T, U>(source: LzIterable<T>, selector: SelectorFunction<T, U>): Lz<U>;

        /**
         * Projects each element of a sequence to an IterableIterator<U> and flattens the resulting sequences into one sequence.
         * @param {SelectorFunction<T, IterableIterator<U> | U[]>} selector A transform function to apply to each element.
         * @returns {Lz<U>} An sequence whose elements are the result of invoking the one-to-many transform function on each element of the
         * input sequence.
         */
        public selectMany<U>(selector: SelectorFunction<T, IterableIterator<U> | U[]>): Lz<U>;

        /**
         * Projects each element of a sequence to an IterableIterator<U> and flattens the resulting sequences into one sequence.
         * @param {LzIterable<T>} source A sequence of values to project.
         * @param {SelectorFunction<T, IterableIterator<U> | U[]>} selector A transform function to apply to each element.
         * @returns {Lz<U>} An sequence whose elements are the result of invoking the one-to-many transform function on each element of the
         * input sequence.
         */
        public static selectMany<T, U>(source: LzIterable<T>, selector: SelectorFunction<T, IterableIterator<U> | U[]>): Lz<U>;

        /**
         * Returns a specified number of contiguous elements from the start of a sequence.
         * @param {number} count The number of elements to return.
         * @returns {IterableIterator<T>} An iterable that contains the specified number of elements from the start of the input sequence.
         */
        public take(count: number): Lz<T>;

        /**
         * Returns a specified number of contiguous elements from the start of a sequence.
         * @param {LzIterable<T>} source The sequence to return elements from.
         * @param {number} count The number of elements to return.
         * @returns {IterableIterator<T>} An iterable that contains the specified number of elements from the start of the input sequence.
         */
        public static take<T>(source: LzIterable<T>, count: number): Lz<T>;

        /**
         * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
         * @param {number} count The number of elements to skip before returning the remaining elements.
         * @returns {IterableIterator<T>} An iterable that contains the elements that occur after the specified index in the input sequence.
         */
        public skip(count: number): Lz<T>;

        /**
         * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
         * @param {LzIterable<T>} source The sequence to return elements from.
         * @param {number} count The number of elements to skip before returning the remaining elements.
         * @returns {IterableIterator<T>} An iterable that contains the elements that occur after the specified index in the input sequence.
         */
        public static skip<T>(source: LzIterable<T>, count: number): Lz<T>;

        /**
         * Returns elements from a sequence as long as a specified condition is true.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {IterableIterator<T>} A sequence that contains the elements from the input sequence that occur before the element at which the
         * test no longer passes.
         */
        public takeWhile(predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Returns elements from a sequence as long as a specified condition is true.
         * @param {LzIterable<T>} source A sequence to return elements from.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {IterableIterator<T>} A sequence that contains the elements from the input sequence that occur before the element at which the
         * test no longer passes.
         */
        public static takeWhile<T>(source: LzIterable<T>, predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {IterableIterator<T>} A sequence that contains the elements from the input sequence starting at the first element in the
         * linear series that does not pass the test specified by predicate.
         */
        public skipWhile(predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
         * @param {LzIterable<T>} source A sequence to return elements from.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {IterableIterator<T>} A sequence that contains the elements from the input sequence starting at the first element in the
         * linear series that does not pass the test specified by predicate.
         */
        public static skipWhile<T>(source: LzIterable<T>, predicate: PredicateFunction<T>): Lz<T>;

        /**
         * Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a
         * specified function.
         * @param {SelectorFunction<T, K>} keySelector A function to extract the key for each element.
         * @returns {IterableIterator<[K, T[]]>} A Map where each entry contains a collection of objects of type T.
         */
        public groupBy<K>(keySelector: SelectorFunction<T, K>): LzGrouped<K, T[]>;

        /**
         * Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a
         * specified function.
         * @param {SelectorFunction<T, K>} keySelector A function to extract the key for each element.
         * @param {SelectorFunction<T, V>} elementSelector A function to map each source element to an element in the returned Map.
         * @returns {IterableIterator<[K, V[]]>} A Map where each entry contains a collection of objects of type V.
         */
        public groupBy<K, V>(keySelector: SelectorFunction<T, K>, elementSelector?: SelectorFunction<T, V>): LzGrouped<K, V[]>;

        /**
         * Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a
         * specified function.
         * @param {LzIterable<T>} source The sequence whose elements to group.
         * @param {SelectorFunction<T, K>} keySelector A function to extract the key for each element.
         * @returns {IterableIterator<[K, V[]]>} A Map where each entry contains a collection of objects of type V.
         */
        public static groupBy<T, K>(source: LzIterable<T>, keySelector: SelectorFunction<T, K>): LzGrouped<K, T[]>;

        /**
         * Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a
         * specified function.
         * @param {LzIterable<T>} source The sequence whose elements to group.
         * @param {SelectorFunction<T, K>} keySelector A function to extract the key for each element.
         * @param {SelectorFunction<T, V>} elementSelector A function to map each source element to an element in the returned Map.
         * @returns {IterableIterator<[K, V[]]>} A Map where each entry contains a collection of objects of type V.
         */
        public static groupBy<T, K, V>(source: LzIterable<T>, keySelector: SelectorFunction<T, K>,
                                       elementSelector?: SelectorFunction<T, V>): LzGrouped<K, V[]>;

        /**
         * Partitions the sequence into arrays of specified size.
         * @param {number} size The size of each partitioned array. The last array may be smaller if there are
         * not enough elements in the sequence to fill it.
         * @returns {Lz<T[]>} A sequence that contains the partitioned arrays.
         */
        public partition(size: number): Lz<T[]>;

        /**
         * Partitions the sequence into arrays of specified size.
         * @param {twoa.LzIterable<T>} source The sequence whose elements to partition.
         * @param {number} size The size of each partitioned array. The last array may be smaller if there are
         * not enough elements in the sequence to fill it.
         * @returns {Lz<T[]>} A sequence that contains the partitioned arrays.
         */
        public static partition<T>(source: LzIterable<T>, size: number): Lz<T[]>;

        /**
         * Produces the set union of two sequences.
         * @param {LzIterable<T>} second A sequence whose distinct elements form the second set for the union.
         * @param {ComparatorFunction<T>} comparator The ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the elements from both input sequences, excluding duplicates.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public union(second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Produces the set union of two sequences.
         * @param {LzIterable<T>} first A sequence whose distinct elements form the first set for the union.
         * @param {LzIterable<T>} second A sequence whose distinct elements form the second set for the union.
         * @param {ComparatorFunction<T>} comparator The ComparatorFunction<T> to compare values.
         * @returns {Lz<T>} A sequence that contains the elements from both input sequences, excluding duplicates.
         * @remarks
         * This method is implemented by using deferred execution. The immediate return value is an object that stores all
         * the information that is required to perform the action. The query represented by this method is not executed
         * until the object is enumerated either by calling its toArray method directly or by using for...of.
         */
        public static union<T>(first: LzIterable<T>, second: LzIterable<T>, comparator?: ComparatorFunction<T>): Lz<T>;

        /**
         * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
         * @param {IterableIterator<U>} second The second sequence to merge.
         * @param {(first: T, second: U) => V} resultSelector A function that specifies how to merge the elements from the two sequences.
         * @returns {IterableIterator<V>} A sequence that contains merged elements of two input sequences.
         */
        public zip<U, V>(second: LzIterable<U>, resultSelector: (first: T, second: U) => V): Lz<V>;

        /**
         * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
         * @param {LzIterable<T>} first The first sequence to merge.
         * @param {IterableIterator<U>} second The second sequence to merge.
         * @param {(first: T, second: U) => V} resultSelector A function that specifies how to merge the elements from the two sequences.
         * @returns {IterableIterator<V>} A sequence that contains merged elements of two input sequences.
         */
        public static zip<T, U, V>(first: LzIterable<T>, second: LzIterable<U>, resultSelector: (first: T, second: U) => V): Lz<V>;

        /**
         * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
         * @param {AccumulatorFunction<T, U>} func An accumulator function to be invoked on each element.
         * @param {U} seed The initial accumulator value.
         * @returns {U} The final accumulator value.
         */
        public aggregate<U>(func: AccumulatorFunction<T, U>, seed?: U): U;

        /**
         * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
         * @param {LzIterable<T>} source The sequence to aggregate over.
         * @param {AccumulatorFunction<T, U>} func An accumulator function to be invoked on each element.
         * @param {U} seed The initial accumulator value.
         * @returns {U} The final accumulator value.
         */
        public static aggregate<T, U>(source: LzIterable<T>, func: AccumulatorFunction<T, U>, seed?: U): U;

        /**
         * Invokes a transform function on each element of a sequence and returns the maximum value.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The maximum value in the sequence.
         */
        public max(selector: SelectorFunction<T, number>): number;
        public max(selector?: SelectorFunction<number, number>): number;

        /**
         * Invokes a transform function on each element of a sequence and returns the maximum value.
         * @param {LzIterable<T>} source A sequence of values to determine the maximum value of.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The maximum value in the sequence.
         */
        public static max<T>(source: LzIterable<T>, selector: SelectorFunction<T, number>): number;
        public static max<T extends number>(source: LzIterable<T>, selector?: SelectorFunction<T, number>): number;

        /**
         * Invokes a transform function on each element of a sequence and returns the minimum value.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The minimum value in the sequence.
         */
        public min(selector: SelectorFunction<T, number>): number;
        public min(selector?: SelectorFunction<number, number>): number;

        /**
         * Invokes a transform function on each element of a sequence and returns the minimum value.
         * @param {LzIterable<T>} source A sequence of values to determine the minimum value of.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The minimum value in the sequence.
         */
        public static min<T>(source: LzIterable<T>, selector: SelectorFunction<T, number>): number;
        public static min<T extends number>(source: LzIterable<T>, selector?: SelectorFunction<T, number>): number;

        /**
         * Computes the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The sum of the projected values.
         */
        public sum(selector: SelectorFunction<T, number>): number;
        public sum(selector?: SelectorFunction<number, number>): number;

        /**
         * Computes the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.
         * @param {LzIterable<T>} source A sequence of values that are used to calculate a sum.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The sum of the projected values.
         */
        public static sum<T>(source: LzIterable<T>, selector: SelectorFunction<T, number>): number;
        public static sum<T extends number>(source: LzIterable<T>, selector?: SelectorFunction<T, number>): number;

        /**
         * Computes the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The average of the sequence of values, or 0 if the source sequence is empty.
         */
        public average(selector: SelectorFunction<T, number>): number;
        public average(selector?: SelectorFunction<number, number>): number;

        /**
         * Computes the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.
         * @param {LzIterable<T>} source A sequence of values that are used to calculate an average.
         * @param {SelectorFunction<T, number>} selector A transform function to apply to each element.
         * @returns {number} The average of the sequence of values, or 0 if the source sequence is empty.
         */
        public static average<T>(source: LzIterable<T>, selector: SelectorFunction<T, number>): number;
        public static average<T extends number>(source: LzIterable<T>, selector?: SelectorFunction<T, number>): number;

        /**
         * Returns a number that represents how many elements in the specified sequence satisfy a condition.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
         */
        public count(predicate?: PredicateFunction<T>): number;

        /**
         * Returns a number that represents how many elements in the specified sequence satisfy a condition.
         * @param {LzIterable<T>} source The sequence to return elements from.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
         */
        public static count<T>(source: LzIterable<T>, predicate?: PredicateFunction<T>): number;

        /**
         * Determines whether any element of a sequence satisfies a condition.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {boolean} <b>true</b> if any elements in the source sequence pass the test in the specified predicate; otherwise,
         * <b>false</b>.
         */
        public any(predicate: PredicateFunction<T>): boolean;

        /**
         * Determines whether any element of a sequence satisfies a condition.
         * @param {LzIterable<T>} source The sequence whose elements to apply the predicate to.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {boolean} <b>true</b> if any elements in the source sequence pass the test in the specified predicate; otherwise,
         * <b>false</b>.
         */
        public static any<T>(source: LzIterable<T>, predicate: PredicateFunction<T>): boolean;

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {boolean} <b>true</b> if every element of the source sequence passes the test in the specified predicate, or if the sequence
         * is empty; otherwise, <b>false</b>.
         */
        public all(predicate: PredicateFunction<T>): boolean;

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         * @param {LzIterable<T>} source The sequence that contains the elements to apply the predicate to.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {boolean} <b>true</b> if every element of the source sequence passes the test in the specified predicate, or if the sequence
         * is empty; otherwise, <b>false</b>.
         */
        public static all<T>(source: LzIterable<T>, predicate: PredicateFunction<T>): boolean;

        /**
         * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
         * @param {PredicateFunction<T>} predicate A function to test an element for a condition. Return true to keep the element,
         * false otherwise.
         * @returns {T} The single element of the input sequence that satisfies a condition.
         * @throws If no element satisfies the condition in predicate, or more than one element satisfies the condition
         * in predicate, or the source sequence is empty.
         */
        public single(predicate?: PredicateFunction<T>): T;

        /**
         * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
         * @param {LzIterable<T>} source An iterable to return the single element of.
         * @param {PredicateFunction<T>} predicate A function to test an element for a condition. Return true to keep the element,
         * false otherwise.
         * @returns {T} The single element of the input sequence that satisfies a condition.
         * @throws If no element satisfies the condition in predicate, or more than one element satisfies the condition
         * in predicate, or the source sequence is empty.
         */
        public static single<T>(source: LzIterable<T>,
                                predicate?: PredicateFunction<T>): T;

        /**
         * Returns the only element of a sequence that satisfies a specified condition or a default value if no such element
         * exists; this method throws an exception if more than one element satisfies the condition.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test an element for a condition. Return true to keep the element,
         * false otherwise.
         * @returns {T} The single element of the input sequence that satisfies a condition.
         * @throws If more than one element satisfies the condition in predicate.
         */
        public singleOrDefault(defaultValue: T, predicate?: PredicateFunction<T>): T;

        /**
         * Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists;
         * this method throws an exception if more than one element satisfies the condition.
         * @param {LzIterable<T>} source A sequence to return the single element from.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test an element for a condition. Return true to keep the element,
         * false otherwise.
         * @returns {T} The single element of the input sequence that satisfies the condition, or <i>defaultValue</i> if
         * no such element is found.
         * @throws If more than one element satisfies the condition in predicate.
         */
        public static singleOrDefault<T>(source: LzIterable<T>, defaultValue: T,
                                         predicate?: PredicateFunction<T>): T;

        /**
         * Returns the first element of a sequence.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The first element.
         * @throws If the source sequence contains no elements or the predicate did not match any elements.
         */
        public first(predicate?: PredicateFunction<T>): T;

        /**
         * Returns the first element of a sequence.
         * @param {LzIterable<T>} source The sequence to return an element from.
         * @param {(PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The first element.
         * @throws If the source sequence contains no elements or the predicate did not match any elements.
         */
        public static first<T>(source: LzIterable<T>, predicate?: PredicateFunction<T>): T;

        /**
         * Returns the first element of a sequence, or a default value if the sequence contains no elements.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The first element, or a default value if the sequence contains no elements.
         */
        public firstOrDefault(defaultValue: T, predicate?: PredicateFunction<T>): T;

        /**
         * Returns the first element of a sequence, or a default value if the sequence contains no elements.
         * @param {LzIterable<T>} source The sequence to return an element from.
         * @param {T} defaultValue The default value.
         * @param {PredicateFunction<T>} predicate A function to test each element for a condition.
         * @returns {T} The first element, or a default value if the sequence contains no elements.
         */
        public static firstOrDefault<T>(source: LzIterable<T>, defaultValue: T,
                                        predicate?: PredicateFunction<T>): T;

        /**
         * Creates a Map from an Array according to a specified key selector function.
         * @param {SelectorFunction<T, K>} keySelector A function to extract a key from each element.
         * @returns {Map<K, U>} A Map that contains keys and values.
         */
        public toDictionary<K, T>(keySelector: SelectorFunction<T, K>): Map<K, T>;

        /**
         * Creates a Map from an Array according to a specified key selector function.
         * @param {SelectorFunction<T, K>} keySelector A function to extract a key from each element.
         * @param {SelectorFunction<T, U>} elementSelector A function to map each source element to an element in the returned Map.
         * @returns {Map<K, U>} A Map that contains keys and values.
         */
        public toDictionary<K, U>(keySelector: SelectorFunction<T, K>, elementSelector: SelectorFunction<T, U>): Map<K, U>;

        /**
         * Creates a Map from a sequence of IterableIterator<[T1, T2]>
         * @returns {Map<T1, T2>} A Map that contains keys and values.
         */
        public toDictionary<T1, T2, T extends [T1, T2]>(): Map<T1, T2>;

        /**
         * Creates a Map from an Array according to a specified key selector function.
         * @param {LzIterable<T>} source The sequence to create a Map<K, T> from.
         * @param {SelectorFunction<T, K>} keySelector A function to extract a key from each element.
         * @returns {Map<K, T>} A Map that contains keys and values.
         */
        public static toDictionary<T, K>(source: LzIterable<T>, keySelector: SelectorFunction<T, K>): Map<K, T>;

        /**
         * Creates a Map from an Array according to a specified key selector function.
         * @param {LzIterable<T>} source The sequence to create a Map<K, T> from.
         * @param {SelectorFunction<T, K>} keySelector A function to extract a key from each element.
         * @param {SelectorFunction<T, U>} elementSelector A function to map each source element to an element in the returned Map.
         * @returns {Map<K, U>} A Map that contains keys and values.
         */
        public static toDictionary<T, K, U>(source: LzIterable<T>, keySelector: SelectorFunction<T, K>,
                                            elementSelector: SelectorFunction<T, U>): Map<K, U>;

        /**
         * Creates a Map from a sequence of IterableIterator<[T1, T2[]]>
         * @param {LzIterable<T>} source The sequence to create a Map<K, T> from.
         * @returns {Map<T1, T2>} A Map that contains keys and values.
         */
        public static toDictionary<T1, T2>(source: LzIterable<[T1, T2]>): Map<T1, T2>;

        /**
         * Creates an array from a IterableIterator<T>.
         * @returns {T[]} An array that contains the elements from the input sequence.
         */
        public toArray(): T[];

        /**
         * Creates an array from a IterableIterator<T>.
         * @param {LzIterable<T>} source An IterableIterator<T> to create an array from.
         * @returns {T[]} An array that contains the elements from the input sequence.
         */
        public static toArray<T>(source: LzIterable<T>): T[];

        /**
         * Creates a Set<T> from an IterableIterator<T>.
         * @returns {Set<T>} A Set<T> that contains values of type T selected from the input sequence.
         */
        public toSet(): Set<T>;

        /**
         * Creates a Set<T> from an IterableIterator<T>.
         * @param {LzIterable<T>} source An IterableIterator<T> to create a Set<T> from.
         * @returns {Set<T>} A Set<T> that contains values of type T selected from the input sequence.
         */
        public static toSet<T>(source: LzIterable<T>): Set<T>;

        public [ Symbol.iterator ](): IterableIterator<T>;

        public next(value?: any): IteratorResult<T>;

        public return(value?: any): IteratorResult<T>;

        public throw(e?: any): IteratorResult<T>;
    }

    export class LzGrouped<T1, T2> extends Lz<[T1, T2]> {
        /**
         * Creates a Map from a sequence of IterableIterator<[T1, T2]>
         * @returns {Map<T1, T2>} A Map that contains keys and values.
         */
        public toDictionary(): Map<T1, T2>;

        /**
         * Creates a Map from a sequence of IterableIterator<[T1, T2]>
         * @param {LzIterable<[T1, T2]>} source The sequence to create a Map<T1, T2> from.
         * @returns {Map<T1, T2>} A Map that contains keys and values.
         */
        public static toDictionary<T1, T2>(source: LzIterable<[T1, T2]>): Map<T1, T2>;
    }

    export class LzOrdered<T, K> extends Lz<T> {
        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenBy<V>(selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending or descending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenBy<V>(selector: SelectorFunctionNoIndex<T, V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenBy<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;

        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending or descending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @param {boolean} descending Whether to sort in descending order rather than ascending.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenBy<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>, descending: boolean): LzOrdered<T, V>;

        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order according to a key.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenByDescending<V>(selector: SelectorFunctionNoIndex<T, V>): LzOrdered<T, V>;

        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparator.
         * @param {SelectorFunctionNoIndex<T, V>} selector A function to extract a key from an element.
         * @param {ComparatorFunction<V>} comparator A ComparatorFunction<V> to compare keys.
         * @returns {LzOrdered<T, V>} A sequence whose elements are sorted according to a key.
         */
        public thenByDescending<V>(selector: SelectorFunctionNoIndex<T, V>, comparator: ComparatorFunction<V>): LzOrdered<T, V>;
    }

    export class SortedMap<K, V> extends Map<K, V> implements IterableIterator<[K, V]> {
        constructor();
        constructor(entries: Iterable<readonly [K, V]> | null, comparator?: (a: K, b: K, c?: V, d?: V) => number);

        /**
         * Returns the first (lowest) key currently in this map.
         * @returns the first (lowest) key currently in this map
         */
        public firstKey(): K;

        /**
         * Returns the last (highest) key currently in this map.
         * @returns the last (highest) key currently in this map
         */
        public lastKey(): K;

        /**
         * Returns a view of the portion of this map whose keys are greater than or equal to fromKey.
         * @param fromKey low endpoint (inclusive) of the keys in the returned map
         * @returns a view of the portion of this map whose keys are greater than or equal to fromKey
         */
        public tailMap(fromKey: K): SortedMap<K, V>;

        /**
         * Returns a view of the portion of this map whose keys range from fromKey, inclusive, to toKey, exclusive.
         * @param fromKey low endpoint (inclusive) of the keys in the returned map
         * @param toKey high endpoint (exclusive) of the keys in the returned map
         * @returns a view of the portion of this map whose keys range from fromKey, inclusive, to toKey, exclusive
         */
        public subMap(fromKey: K, toKey: K): SortedMap<K, V>;

        /**
         * Returns a view of the portion of this map whose keys are strictly less than toKey.
         * @param toKey high endpoint (exclusive) of the keys in the returned map
         * @returns a view of the portion of this map whose keys are strictly less than toKey
         */
        public headMap(toKey: K): SortedMap<K, V>;

        /**
         * If the specified key is not already associated with a value associates it with the given value and returns that value, else returns the current value.
         * @param {K} key key with which the specified value is to be associated
         * @param {V} value value to be associated with the specified key
         * @returns {V} the previous value associated with the specified key, or the specified value if there was no mapping for the key.
         */
        public setIfAbsent(key: K, value: V): V;

        /**
         * The clear() method removes all elements from a Map object.
         */
        public clear(): void;

        /**
         * The delete() method removes the specified element from a Map object by key.
         * @param {K} key The key of the element to remove from the Map object.
         * @returns {boolean} true if an element in the Map object existed and has been removed, or false if the element does not exist.
         */
        public delete(key: K): boolean;

        /**
         * Returns an iterable of entries in the map.
         * @returns {IterableIterator<[K, V]>} an iterable of entries in the map.
         */
        public [Symbol.iterator](): IterableIterator<[ K, V ]>;

        /**
         * Returns an iterable of key, value pairs for every entry in the map.
         * @returns {IterableIterator<[K, V]>} an iterable of key, value pairs for every entry in the map.
         */
        public entries(): IterableIterator<[ K, V ]>;

        /**
         * Returns an iterable of keys in the map
         * @returns {IterableIterator<K>} an iterable of keys in the map
         */
        public keys(): IterableIterator<K>;

        /**
         * Returns an iterable of values in the map.
         * @returns {IterableIterator<V>} an iterable of values in the map.
         */
        public values(): IterableIterator<V>;

        /**
         * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
         * @param {(value: V, key: K, map: SortedMap<K, V>) => void} callbackFn Function to execute for each entry in the map.
         * @param thisArg Value to use as this when executing callback.
         */
        public forEach(callbackFn: (value: V, key: K, map: SortedMap<K, V>) => void, thisArg?: any): void;

        public next(value?: any): IteratorResult<[ K, V ]>;
        public return(value?: any): IteratorResult<[ K, V ]>;
        public throw(e?: any): IteratorResult<[ K, V ]>;
    }

    export class StringBuilder {
        public constructor(content: string, indentSize?: number);

        public append(...content: string[]): this;

        public appendLines(...content: string[]): this;

        public indent(): this;

        public outdent(): this;

        public newline(n?: number): this;

        public toString(): string;

        /**
         * Gets the current length of the final string.
         * @returns {number} The length of the final string in its current state.
         */
        public get length(): number;
    }

    export class FilenameUtils {
        /**
         * Concatenates a fileName to a base path using normal command line style rules.
         * <p>
         * The effect is equivalent to resultant directory after changing
         * directory to the first argument, followed by changing directory to
         * the second argument.
         * </p>
         * <p>
         * The first argument is the base path, the second is the path to concatenate.
         * The returned path is always normalized via {@link #normalize(String)},
         * thus {@code ..} is handled.
         * </p>
         * <p>
         * If {@code pathToAdd} is absolute (has an absolute prefix), then
         * it will be normalized and returned.
         * Otherwise, the paths will be joined, normalized and returned.
         * </p>
         * <p>
         * The output will be the same on both Unix and Windows except
         * for the separator character.
         * </p>
         * <pre>
         * /foo/      + bar        --&gt;  /foo/bar
         * /foo       + bar        --&gt;  /foo/bar
         * /foo       + /bar       --&gt;  /bar
         * /foo       + C:/bar     --&gt;  C:/bar
         * /foo       + C:bar      --&gt;  C:bar [1]
         * /foo/a/    + ../bar     --&gt;  /foo/bar
         * /foo/      + ../../bar  --&gt;  null
         * /foo/      + /bar       --&gt;  /bar
         * /foo/..    + /bar       --&gt;  /bar
         * /foo       + bar/c.txt  --&gt;  /foo/bar/c.txt
         * /foo/c.txt + bar        --&gt;  /foo/c.txt/bar [2]
         * </pre>
         * <p>
         * [1] Note that the Windows relative drive prefix is unreliable when
         * used with this method.
         * </p>
         * <p>
         * [2] Note that the first parameter must be a path. If it ends with a name, then
         * the name will be built into the concatenated path. If this might be a problem,
         * use {@link #getFullPath(String)} on the base path argument.
         * </p>
         *
         * @param basePath  the base path to attach to, always treated as a path
         * @param fullFileNameToAdd  the fileName (or path) to attach to the base
         * @return the concatenated path, or null if invalid.  Null bytes inside string will be removed
         */
        public static concat(basePath: string, fullFileNameToAdd: string): string;

        /**
         * Determines whether the {@code parent} directory contains the {@code child} element (a file or directory).
         * <p>
         * The files names are expected to be normalized.
         * </p>
         *
         * Edge cases:
         * <ul>
         * <li>A {@code directory} must not be null: if null, throw IllegalArgumentException</li>
         * <li>A directory does not contain itself: return false</li>
         * <li>A null child file is not contained in any parent: return false</li>
         * </ul>
         *
         * @param canonicalParent
         *            the file to consider as the parent.
         * @param canonicalChild
         *            the file to consider as the child.
         * @return true is the candidate leaf is under by the specified composite. False otherwise.
         * @since 2.2
         * @see FileUtils#directoryContains(File, File)
         */
        public static directoryContains(canonicalParent: string, canonicalChild: string): boolean;

        /**
         * Checks whether two fileNames are equal, optionally normalizing and providing
         * control over the case-sensitivity.
         *
         * @param fileName1  the first fileName to query, may be null
         * @param fileName2  the second fileName to query, may be null
         * @param normalized  whether to normalize the fileNames
         * @return true if the fileNames are equal, null equals null
         * @since 1.3
         */
        public static equals(fileName1: string, fileName2: string, normalized?: boolean): boolean;

        /**
         * Checks whether two fileNames are equal after both have been normalized.
         * <p>
         * Both fileNames are first passed to {@link #normalize(String)}.
         * The check is then performed in a case-sensitive manner.
         * </p>
         *
         * @param fileName1  the first fileName to query, may be null
         * @param fileName2  the second fileName to query, may be null
         * @return true if the fileNames are equal, null equals null
         */
        public static equalsNormalized(fileName1: string, fileName2: string): boolean;

        /**
         * Checks whether two fileNames are equal after both have been normalized
         * and using the case rules of the system.
         * <p>
         * Both fileNames are first passed to {@link #normalize(String)}.
         * The check is then performed case-sensitive on Unix and
         * case-insensitive on Windows.
         * </p>
         *
         * @param fileName1  the first fileName to query, may be null
         * @param fileName2  the second fileName to query, may be null
         * @return true if the fileNames are equal, null equals null
         */
        public static equalsNormalizedOnSystem(fileName1: string, fileName2: string): boolean;

        /**
         * Checks whether two fileNames are equal using the case rules of the system.
         * <p>
         * No processing is performed on the fileNames other than comparison.
         * The check is case-sensitive on Unix and case-insensitive on Windows.
         * </p>
         *
         * @param fileName1  the first fileName to query, may be null
         * @param fileName2  the second fileName to query, may be null
         * @return true if the fileNames are equal, null equals null
         */
        public static equalsOnSystem(fileName1: string, fileName2: string): boolean;

        /**
         * Flips the Windows name separator to Linux and vice-versa.
         *
         * @param ch The Windows or Linux name separator.
         * @return The Windows or Linux name separator.
         */
        public static flipSeparator(ch: string): string;

        /**
         * Gets the base name, minus the full path and extension, from a full fileName.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The text after the last forward or backslash and before the last dot is returned.
         * </p>
         * <pre>
         * a/b/c.txt --&gt; c
         * a.txt     --&gt; a
         * a/b/c     --&gt; c
         * a/b/c/    --&gt; ""
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the name of the file without the path, or an empty string if none exists. Null bytes inside string
         * will be removed
         */
        public static getBaseName(fileName: string): string;

        /**
         * Gets the extension of a fileName.
         * <p>
         * This method returns the textual part of the fileName after the last dot.
         * There must be no directory separator after the dot.
         * </p>
         * <pre>
         * foo.txt      --&gt; "txt"
         * a/b/c.jpg    --&gt; "jpg"
         * a/b.txt/c    --&gt; ""
         * a/b/c        --&gt; ""
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on, with the
         * exception of a possible {@link IllegalArgumentException} on Windows (see below).
         * </p>
         * <p>
         * <b>Note:</b> This method used to have a hidden problem for names like "foo.exe:bar.txt".
         * In this case, the name wouldn't be the name of a file, but the identifier of an
         * alternate data stream (bar.txt) on the file foo.exe. The method used to return
         * ".txt" here, which would be misleading. Commons IO 2.7, and later versions, are throwing
         * an {@link IllegalArgumentException} for names like this.
         * </p>
         *
         * @param fileName the fileName to retrieve the extension of.
         * @return the extension of the file or an empty string if none exists or {@code null}
         * if the fileName is {@code null}.
         * @throws IllegalArgumentException <b>Windows only:</b> The fileName parameter is, in fact,
         * the identifier of an Alternate Data Stream, for example "foo.exe:bar.txt".
         */
        public static getExtension(fileName: string): string;

        /**
         * Gets the full path from a full fileName, which is the prefix + path.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The method is entirely text based, and returns the text before and
         * including the last forward or backslash.
         * </p>
         * <pre>
         * C:\a\b\c.txt --&gt; C:\a\b\
         * ~/a/b/c.txt  --&gt; ~/a/b/
         * a.txt        --&gt; ""
         * a/b/c        --&gt; a/b/
         * a/b/c/       --&gt; a/b/c/
         * C:           --&gt; C:
         * C:\          --&gt; C:\
         * ~            --&gt; ~/
         * ~/           --&gt; ~/
         * ~user        --&gt; ~user/
         * ~user/       --&gt; ~user/
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the path of the file, an empty string if none exists, null if invalid
         */
        public static getFullPath(fileName: string): string;

        /**
         * Gets the full path from a full fileName, which is the prefix + path,
         * and also excluding the final directory separator.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The method is entirely text based, and returns the text before the
         * last forward or backslash.
         * </p>
         * <pre>
         * C:\a\b\c.txt --&gt; C:\a\b
         * ~/a/b/c.txt  --&gt; ~/a/b
         * a.txt        --&gt; ""
         * a/b/c        --&gt; a/b
         * a/b/c/       --&gt; a/b/c
         * C:           --&gt; C:
         * C:\          --&gt; C:\
         * ~            --&gt; ~
         * ~/           --&gt; ~
         * ~user        --&gt; ~user
         * ~user/       --&gt; ~user
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the path of the file, an empty string if none exists, null if invalid
         */
        public static getFullPathNoEndSeparator(fileName: string): string;

        /**
         * Gets the name minus the path from a full fileName.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The text after the last forward or backslash is returned.
         * </p>
         * <pre>
         * a/b/c.txt --&gt; c.txt
         * a.txt     --&gt; a.txt
         * a/b/c     --&gt; c
         * a/b/c/    --&gt; ""
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the name of the file without the path, or an empty string if none exists.
         * Null bytes inside string will be removed
         */
        public static getName(fileName: string): string;

        /**
         * Gets the path from a full fileName, which excludes the prefix.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The method is entirely text based, and returns the text before and
         * including the last forward or backslash.
         * </p>
         * <pre>
         * C:\a\b\c.txt --&gt; a\b\
         * ~/a/b/c.txt  --&gt; a/b/
         * a.txt        --&gt; ""
         * a/b/c        --&gt; a/b/
         * a/b/c/       --&gt; a/b/c/
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         * <p>
         * This method drops the prefix from the result.
         * See {@link #getFullPath(String)} for the method that retains the prefix.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the path of the file, an empty string if none exists, null if invalid.
         * Null bytes inside string will be removed
         */
        public static getPath(fileName: string): string;

        /**
         * Gets the path from a full fileName, which excludes the prefix, and
         * also excluding the final directory separator.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The method is entirely text based, and returns the text before the
         * last forward or backslash.
         * </p>
         * <pre>
         * C:\a\b\c.txt --&gt; a\b
         * ~/a/b/c.txt  --&gt; a/b
         * a.txt        --&gt; ""
         * a/b/c        --&gt; a/b
         * a/b/c/       --&gt; a/b/c
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * </p>
         * <p>
         * This method drops the prefix from the result.
         * See {@link #getFullPathNoEndSeparator(String)} for the method that retains the prefix.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the path of the file, an empty string if none exists, null if invalid.
         * Null bytes inside string will be removed
         */
        public static getPathNoEndSeparator(fileName: string): string;

        /**
         * Gets the prefix from a full fileName, such as {@code C:/}
         * or {@code ~/}.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The prefix includes the first slash in the full fileName where applicable.
         * </p>
         * <pre>
         * Windows:
         * a\b\c.txt           --&gt; ""          --&gt; relative
         * \a\b\c.txt          --&gt; "\"         --&gt; current drive absolute
         * C:a\b\c.txt         --&gt; "C:"        --&gt; drive relative
         * C:\a\b\c.txt        --&gt; "C:\"       --&gt; absolute
         * \\server\a\b\c.txt  --&gt; "\\server\" --&gt; UNC
         *
         * Unix:
         * a/b/c.txt           --&gt; ""          --&gt; relative
         * /a/b/c.txt          --&gt; "/"         --&gt; absolute
         * ~/a/b/c.txt         --&gt; "~/"        --&gt; current user
         * ~                   --&gt; "~/"        --&gt; current user (slash added)
         * ~user/a/b/c.txt     --&gt; "~user/"    --&gt; named user
         * ~user               --&gt; "~user/"    --&gt; named user (slash added)
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * ie. both Unix and Windows prefixes are matched regardless.
         * </p>
         *
         * @param fileName  the fileName to query, null returns null
         * @return the prefix of the file, null if invalid. Null bytes inside string will be removed
         */
        public static getPrefix(fileName: string): string;

        /**
         * Returns the length of the fileName prefix, such as {@code C:/} or {@code ~/}.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * </p>
         * <p>
         * The prefix length includes the first slash in the full fileName
         * if applicable. Thus, it is possible that the length returned is greater
         * than the length of the input string.
         * </p>
         * <pre>
         * Windows:
         * a\b\c.txt           --&gt; 0           --&gt; relative
         * \a\b\c.txt          --&gt; 1           --&gt; current drive absolute
         * C:a\b\c.txt         --&gt; 2           --&gt; drive relative
         * C:\a\b\c.txt        --&gt; 3           --&gt; absolute
         * \\server\a\b\c.txt  --&gt; 9           --&gt; UNC
         * \\\a\b\c.txt        --&gt; -1          --&gt; error
         *
         * Unix:
         * a/b/c.txt           --&gt; 0           --&gt; relative
         * /a/b/c.txt          --&gt; 1           --&gt; absolute
         * ~/a/b/c.txt         --&gt; 2           --&gt; current user
         * ~                   --&gt; 2           --&gt; current user (slash added)
         * ~user/a/b/c.txt     --&gt; 6           --&gt; named user
         * ~user               --&gt; 6           --&gt; named user (slash added)
         * //server/a/b/c.txt  --&gt; 9
         * ///a/b/c.txt        --&gt; -1          --&gt; error
         * C:                  --&gt; 0           --&gt; valid filename as only null byte and / are reserved characters
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         * ie. both Unix and Windows prefixes are matched regardless.
         * </p>
         * <p>
         * Note that a leading // (or \\) is used to indicate a UNC name on Windows.
         * These must be followed by a server name, so double-slashes are not collapsed
         * to a single slash at the start of the fileName.
         * </p>
         *
         * @param fileName  the fileName to find the prefix in, null returns -1
         * @return the length of the prefix, -1 if invalid or null
         */
        public static getPrefixLength(fileName: string): number;

        /**
         * Returns the index of the last extension separator character, which is a dot.
         * <p>
         * This method also checks that there is no directory separator after the last dot. To do this it uses
         * {@link #indexOfLastSeparator(String)} which will handle a file in either Unix or Windows format.
         * </p>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on, with the
         * exception of a possible {@link IllegalArgumentException} on Windows (see below).
         * </p>
         * <b>Note:</b> This method used to have a hidden problem for names like "foo.exe:bar.txt".
         * In this case, the name wouldn't be the name of a file, but the identifier of an
         * alternate data stream (bar.txt) on the file foo.exe. The method used to return
         * ".txt" here, which would be misleading. Commons IO 2.7, and later versions, are throwing
         * an {@link IllegalArgumentException} for names like this.
         *
         * @param fileName
         *            the fileName to find the last extension separator in, null returns -1
         * @return the index of the last extension separator character, or -1 if there is no such character
         * @throws IllegalArgumentException <b>Windows only:</b> The fileName parameter is, in fact,
         * the identifier of an Alternate Data Stream, for example "foo.exe:bar.txt".
         */
        public static indexOfExtension(fileName: string): number;

        /**
         * Returns the index of the last directory separator character.
         * <p>
         * This method will handle a file in either Unix or Windows format.
         * The position of the last forward or backslash is returned.
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         *
         * @param fileName  the fileName to find the last path separator in, null returns -1
         * @return the index of the last separator character, or -1 if there
         * is no such character
         */
        public static indexOfLastSeparator(fileName: string): number;

        /**
         * Checks whether the extension of the fileName is one of those specified.
         * <p>
         * This method obtains the extension as the textual part of the fileName
         * after the last dot. There must be no directory separator after the dot.
         * The extension check is case-sensitive on all platforms.
         *
         * @param fileName  the fileName to query, null returns false
         * @param extensions  the extensions to check for, null checks for no extension
         * @return true if the fileName is one of the extensions
         * @throws java.lang.IllegalArgumentException if the supplied fileName contains null bytes
         */
        public static isExtension(fileName: string, extensions: string[]): boolean;

        /**
         * Checks whether the extension of the fileName is that specified.
         * <p>
         * This method obtains the extension as the textual part of the fileName
         * after the last dot. There must be no directory separator after the dot.
         * The extension check is case-sensitive on all platforms.
         *
         * @param fileName  the fileName to query, null returns false
         * @param extension  the extension to check for, null or empty checks for no extension
         * @return true if the fileName has the specified extension
         * @throws java.lang.IllegalArgumentException if the supplied fileName contains null bytes
         */
        // tslint:disable-next-line:unified-signatures
        public static isExtension(fileName: string, extension: string): boolean;

        /**
         * Checks whether the extension of the fileName is one of those specified.
         * <p>
         * This method obtains the extension as the textual part of the fileName
         * after the last dot. There must be no directory separator after the dot.
         * The extension check is case-sensitive on all platforms.
         *
         * @param fileName  the fileName to query, null returns false
         * @param extensions  the extensions to check for, null checks for no extension
         * @return true if the fileName is one of the extensions
         * @throws java.lang.IllegalArgumentException if the supplied fileName contains null bytes
         */
        public static isExtension(fileName: string, ...extensions: string[]): boolean;

        /**
         * Normalizes a path, removing double and single dot path steps.
         * <p>
         * This method normalizes a path to a standard format.
         * The input may contain separators in either Unix or Windows format.
         * The output will contain separators in the format specified.
         * <p>
         * A trailing slash will be retained.
         * A double slash will be merged to a single slash (but UNC names are handled).
         * A single dot path segment will be removed.
         * A double dot will cause that path segment and the one before to be removed.
         * If the double dot has no parent path segment to work with, {@code null}
         * is returned.
         * <p>
         * The output will be the same on both Unix and Windows except
         * for the separator character.
         * <pre>
         * /foo//               --&gt;   /foo/
         * /foo/./              --&gt;   /foo/
         * /foo/../bar          --&gt;   /bar
         * /foo/../bar/         --&gt;   /bar/
         * /foo/../bar/../baz   --&gt;   /baz
         * //foo//./bar         --&gt;   /foo/bar
         * /../                 --&gt;   null
         * ../foo               --&gt;   null
         * foo/bar/..           --&gt;   foo/
         * foo/../../bar        --&gt;   null
         * foo/../bar           --&gt;   bar
         * //server/foo/../bar  --&gt;   //server/bar
         * //server/../bar      --&gt;   null
         * C:\foo\..\bar        --&gt;   C:\bar
         * C:\..\bar            --&gt;   null
         * ~/foo/../bar/        --&gt;   ~/bar/
         * ~/../bar             --&gt;   null
         * </pre>
         * The output will be the same on both Unix and Windows including
         * the separator character.
         *
         * @param fileName  the fileName to normalize, null returns null
         * @param unixSeparator {@code true} if a unix separator should
         * be used or {@code false} if a windows separator should be used.
         * @return the normalized fileName, or null if invalid. Null bytes inside string will be removed
         * @since 2.0
         */
        public static normalize(fileName: string, unixSeparator?: boolean): string;

        /**
         * Normalizes a path, removing double and single dot path steps,
         * and removing any final directory separator.
         * <p>
         * This method normalizes a path to a standard format.
         * The input may contain separators in either Unix or Windows format.
         * The output will contain separators in the format specified.
         * <p>
         * A trailing slash will be removed.
         * A double slash will be merged to a single slash (but UNC names are handled).
         * A single dot path segment will be removed.
         * A double dot will cause that path segment and the one before to be removed.
         * If the double dot has no parent path segment to work with, {@code null}
         * is returned.
         * <p>
         * The output will be the same on both Unix and Windows including
         * the separator character.
         * <pre>
         * /foo//               --&gt;   /foo
         * /foo/./              --&gt;   /foo
         * /foo/../bar          --&gt;   /bar
         * /foo/../bar/         --&gt;   /bar
         * /foo/../bar/../baz   --&gt;   /baz
         * //foo//./bar         --&gt;   /foo/bar
         * /../                 --&gt;   null
         * ../foo               --&gt;   null
         * foo/bar/..           --&gt;   foo
         * foo/../../bar        --&gt;   null
         * foo/../bar           --&gt;   bar
         * //server/foo/../bar  --&gt;   //server/bar
         * //server/../bar      --&gt;   null
         * C:\foo\..\bar        --&gt;   C:\bar
         * C:\..\bar            --&gt;   null
         * ~/foo/../bar/        --&gt;   ~/bar
         * ~/../bar             --&gt;   null
         * </pre>
         *
         * @param fileName  the fileName to normalize, null returns null
         * @param unixSeparator {@code true} if a unix separator should
         * be used or {@code false} if a windows separator should be used.
         * @return the normalized fileName, or null if invalid. Null bytes inside string will be removed
         * @since 2.0
         */
        public static normalizeNoEndSeparator(fileName: string, unixSeparator?: boolean): string;

        /**
         * Removes the extension from a fileName.
         * <p>
         * This method returns the textual part of the fileName before the last dot.
         * There must be no directory separator after the dot.
         * <pre>
         * foo.txt    --&gt; foo
         * a\b\c.jpg  --&gt; a\b\c
         * a\b\c      --&gt; a\b\c
         * a.b\c      --&gt; a.b\c
         * </pre>
         * <p>
         * The output will be the same irrespective of the machine that the code is running on.
         *
         * @param fileName  the fileName to query, null returns null
         * @return the fileName minus the extension
         */
        public static removeExtension(fileName: string): string;

        /**
         * Converts all separators to the system separator.
         *
         * @param path the path to be changed, null ignored.
         * @return the updated path.
         */
        public static separatorsToSystem(path: string): string;

        /**
         * Converts all separators to the Unix separator of forward slash.
         *
         * @param path the path to be changed, null ignored.
         * @return the new path.
         */
        public static separatorsToUnix(path: string): string;

        /**
         * Converts all separators to the Windows separator of backslash.
         *
         * @param path the path to be changed, null ignored.
         * @return the updated path.
         */
        public static separatorsToWindows(path: string): string;

        /**
         * Checks a fileName to see if it matches the specified wildcard matcher,
         * always testing case-sensitive.
         * <p>
         * The wildcard matcher uses the characters '?' and '*' to represent a
         * single or multiple (zero or more) wildcard characters.
         * This is the same as often found on DOS/Unix command lines.
         * The check is case-sensitive always.
         * <pre>
         * wildcardMatch("c.txt", "*.txt")      --&gt; true
         * wildcardMatch("c.txt", "*.jpg")      --&gt; false
         * wildcardMatch("a/b/c.txt", "a/b/*")  --&gt; true
         * wildcardMatch("c.txt", "*.???")      --&gt; true
         * wildcardMatch("c.txt", "*.????")     --&gt; false
         * </pre>
         * N.B. the sequence "*?" does not work properly at present in match strings.
         *
         * @param fileName  the fileName to match on
         * @param wildcardMatcher  the wildcard string to match against
         * @return true if the fileName matches the wildcard string
         */
        public static wildcardMatch(fileName: string, wildcardMatcher: string): boolean;
    }

    export namespace client {
        export type CustomFetchResponse<T> = Omit<Response, keyof Body | 'clone' | 'trailer' | 'type'> & {
            data: T;
            clone?(): Response;
        };

        export interface IClientOptions {
            baseUrl(): string;
            interceptors?: (() => RequestInit)[];
            before?(init: RequestInit, id: string): void;
            after?(response: Response | CustomFetchResponse<any> | Error, id: string): void;
            fetch?<T>(input: string, init?: RequestInit): Promise<CustomFetchResponse<T>>;
            cache?: string;
        }

        export interface IMappingOptions {
            method?: HttpMethod | string;
            value: string;
            blob?: boolean;
            stream?: boolean;
            response?: boolean;
            produces?: string;
            throws?: boolean;
            cache?: string;
            fromCache?: boolean;
            cacheQueryOptions?: CacheQueryOptions;
            cacheMissBehavior?: 'fetch' | 'return';
            interceptors?: (() => RequestInit)[];
            before?(init: RequestInit, id: string): void;
            after?(response: Response | CustomFetchResponse<any> | Error, id: string): void;
            fetch?<T>(input: string, init?: RequestInit): Promise<CustomFetchResponse<T>>;
        }

        export interface IQueryParamOptions {
            name: string;
            required?: boolean;
        }

        export const bodyParam: ParameterDecorator;

        export const init: ParameterDecorator;

        export function client(options: IClientOptions): ClassDecorator;

        export function mapping(options: IMappingOptions): MethodDecorator;

        export function headerParam(name: string): ParameterDecorator;

        export function pathParam(name: string): ParameterDecorator;

        export function formParam(name: string): ParameterDecorator;

        export function queryParam(options: string | IQueryParamOptions): ParameterDecorator;

        export enum HttpMethod {
            GET = 'GET',
            HEAD = 'HEAD',
            POST = 'POST',
            PUT = 'PUT',
            PATCH = 'PATCH',
            DELETE = 'DELETE',
            OPTIONS = 'OPTIONS',
            TRACE = 'TRACE'
        }
    }

    export namespace di {
        export class Application {
            public static run(): void;
            public static getTargets(): ReadonlyMap<string, new(...args: any[]) => any>;
            public static getServices(): ReadonlyMap<string, any>;
            public static getService<T>(name: string): T;

            /**
             * Used to override (or add) service entries. Useful for injecting mock interfaces for unit tests, for example.
             * @param {string} name Name of the service.
             * @param {T} target Instance of the service to register.
             */
            public static registerService<T>(name: string, target: T): void;
        }

        export function autowire(name: string): ParameterDecorator;
        export function autowire(options: { name: string; }): PropertyDecorator;
        export function autowire(target: Object, propertyKey: string | symbol): void;

        /**
         * Injects the decorated class with autowired dependencies when it is instantiated.
         * @description Dependency injection is similar to using the @service decorator except that classes decorated with @inject
         * are not singletons and are not instantiated automatically when the application starts. Instead, the developer can create instances
         * of classes decorated with @inject at any time and they will be injected with their appropriate autowired dependencies
         */
        export const inject: ClassDecorator;

        export function service(name: string): ClassDecorator;
    }

    export namespace scheduling {
        export interface IIntervalOptions {
            /**
             * The callback function to execute at the specified {@link #fixedRate} or {@link #fixedDelay}
             */
            callback: Function;
            /**
             * Execute the callback with a fixed period in milliseconds between invocations.
             */
            fixedRate?: number;
            /**
             * Execute the callback with a fixed period in milliseconds between the end of the last invocation and the start of the next.
             */
            fixedDelay?: number;
            /**
             * Number of milliseconds to delay before the first execution of a {@link #fixedRate} or {@link #fixedDelay} task.
             */
            initialDelay?: number;
        }

        export type IScheduledOptions = Pick<IIntervalOptions, 'fixedRate' | 'fixedDelay' | 'initialDelay'>;

        export interface IEnableSchedulingOptions {
            include?: string[];
            exclude?: string[];
        }

        export function scheduled(options: IScheduledOptions): MethodDecorator;

        /**
         * As a class decorator: schedules will be started when class is instantiated; as a method decorator: schedules will be started when the decorated method is first called
         * @param {IEnableSchedulingOptions} options Specify which decorated scheduled methods to include/exclude from starting.
         * @returns {ClassDecorator | MethodDecorator}
         */
        export function enableScheduling(options?: IEnableSchedulingOptions): ClassDecorator | MethodDecorator;

        /**
         * Schedules will be stopped when the decorated method is first called.
         * @param {IEnableSchedulingOptions} options Specify which decorated scheduled methods to include/exclude from stopping.
         * @returns {MethodDecorator}
         */
        export function disableScheduling(options?: IEnableSchedulingOptions): MethodDecorator;

        /**
         * Start a timer interval with the specified options. Calling the returned function will stop the timer.
         * @param {IIntervalOptions} options Timer options
         * @returns {() => void} Cancel function
         */
        export function interval(options: IIntervalOptions): () => void;
    }

    export namespace util {
        export class Color {
            public r: number;
            public g: number;
            public b: number;
            public a: number;

            public constructor(r: number, g: number, b: number, a: number);

            public static parse(color: string): Color;

            public set(color: { r?: number, g?: number, b?: number, a?: number }): Color;

            public add(color: { r?: number, g?: number, b?: number, a?: number }): Color;

            public lighten(percentage?: number): Color;

            public darken(percentage?: number): Color;

            public rotate(degrees: number): Color;

            public toHSL(): { h: number, s: number, l: number, a: number, toString: () => string };

            public toString(): string;

            public toHtmlString(): string;
        }

        export class MathHelper {
            public static readonly radiansDegreesRatio: number;
            public static readonly degreesRadiansRatio: number;

            public static toRadians(degrees: number): number;

            public static toDegrees(radians: number): number;

            public static clamp(value: number, min: number, max: number): number;

            public static round(value: number, digits: number): number;
        }

        export class NamesGenerator {
            /**
             * getRandomName generates a random name from the list of adjectives and surnames in this package
             * formatted as "adjective_surname". For example 'focused_turing'.
             * @param retry If retry is non-zero, a random integer between 0 and 10 will be added to the end of the name, e.g `focused_turing3`
             */
            public static getRandomName(retry?: number): string;
        }

        export class TextMatching {
            /**
             * Calculates the Levenshtein distance between two text sequences
             * @param {string} a First string
             * @param {string} b Second string
             * @param {boolean} caseInsensitive Whether to calculate the distance in a case-insensitive manner; default: false
             * @returns {number} The Levenshtein distance between the two test sequences
             */
            public static levenshtein(a: string, b: string, caseInsensitive?: boolean): number;

            public static matchAll(a: string[], b: string[], replacements?: (string | RegExp)[]): [ string, string ][];
        }

        /**
         * Creates a URL with the specified base, path, and query params.
         * @param {string} baseUrl The URL to use for the base.
         * @param {string} path The path of the URL.
         * @param {Record<string, any>} params The query parameters.
         * @returns {string} The constructed URL with any necessary component encodings.
         */
        export function createUrl(baseUrl: string, path: string, params?: Record<string, any>): string;

        export function downloadFile(url: string): void;
        export function downloadFile(content: Blob, filename: string): void;
        export function downloadFile(content: string, filename: string, type: string): void;

        export function blobToObject<T>(blob: Blob): Promise<T>;
        export function blobToString(blob: Blob, encoding?: string): Promise<string>;

        export interface IUUIDOptions {
            /**
             * Whether to return the UUID as an unsigned 8-bit integer array or as a canonical string
             */
            binary?: boolean;

            /**
             * Whether to use the native function, if available.
             */
            native?: boolean;
        }

        /**
         * Generates a canonical v4 UUID
         * @param {{binary?: false, native?: boolean}} options
         * @returns {string} The canonical v4 UUID
         */
        export function uuid(options?: { binary?: false; native?: boolean; }): string;

        /**
         * Generates a binary v4 UUID
         * @param {{binary: true, native?: boolean}} options
         * @returns {Uint8Array} The v4 UUID as an unsigned 8-bit integer array
         */
        export function uuid(options: { binary: true; native?: boolean }): Uint8Array;

        /**
         * Generates a v4 UUID with the specified options
         * @param {IUUIDOptions} options
         * @returns {string | Uint8Array} A v4 UUID as a canonical string or unsigned 8-bit integer array
         */
        export function uuid(options: IUUIDOptions): string | Uint8Array;

        export interface IFlattenOptions {
            acceptKey?(key: string, nestedKey: string): boolean;
        }

        export function flatten<T extends object, U>(obj: T, root?: string, options?: IFlattenOptions): U;

        export function deepEqual(a: any, b: any): boolean;
    }

    export namespace geometry {
        /**
         * Indicates the extent to which bounding volumes intersect or contain one another.
         * @type {{disjoint: number = 0, contains: number = 1, intersects: number = 2}}
         */
        export type ContainmentType = 0 | 1 | 2;

        export class BoundingBox {
            constructor(min: Vector3, max: Vector3);

            public min: Vector3;
            public max: Vector3;

            public getCorners(): [Vector3, Vector3, Vector3, Vector3, Vector3, Vector3, Vector3, Vector3];
            public getCornersXY(): [Vector3, Vector3, Vector3, Vector3];
            public intersects(box: BoundingBox): boolean;
            public containsBox(box: BoundingBox): ContainmentType;
            public containsPoint(point: Vector3): ContainmentType;
            public grow(amount: Vector3): void;

            public static createMerged(original: BoundingBox, additional: BoundingBox): BoundingBox;
            public static createFromPoints(points: Vector3[]): BoundingBox;
        }

        export class BoundingSphere {
            public center: Vector3;
            public radius: number;

            constructor(center: Vector3, radius: number);
            public contains(v: Vector3): boolean;
        }

        export class Matrix {
            constructor(
                m11: number, m12: number, m13: number, m14: number,
                m21: number, m22: number, m23: number, m24: number,
                m31: number, m32: number, m33: number, m34: number,
                m41: number, m42: number, m43: number, m44: number);

            public matrix: number[][];

            public m11: number; public m12: number; public m13: number; public m14: number;
            public m21: number; public m22: number; public m23: number; public m24: number;
            public m31: number; public m32: number; public m33: number; public m34: number;
            public m41: number; public m42: number; public m43: number; public m44: number;

            public backward: Vector3;
            public down: Vector3;
            public forward: Vector3;
            public left: Vector3;
            public right: Vector3;
            public translation: Vector3;
            public up: Vector3;

            public add(matrix: Matrix): Matrix;
            public decompose(): { success: boolean, scale: Vector3, rotation: Quaternion, translation: Vector3 };
            public determinant(): number;
            public inverse(): Matrix;
            public equals(matrix2: Matrix): boolean;
            public subtract(matrix: Matrix): Matrix;
            public multiplyScalar(scalar: number): Matrix;
            public multiply(matrix: Matrix): Matrix;
            public divideScalar(scalar: number): Matrix;
            public divide(matrix: Matrix): Matrix;

            public static identity: Matrix;
            public static add(matrix1: Matrix, matrix2: Matrix): Matrix;
            public static determinant(matrix: Matrix): number;
            public static inverse(matrix: Matrix): Matrix;
            public static equals(matrix1: Matrix, matrix2: Matrix): boolean;
            public static subtract(matrix1: Matrix, matrix2: Matrix): Matrix;
            public static multiplyScalar(matrix: Matrix, scalar: number): Matrix;
            public static multiply(matrix1: Matrix, matrix2: Matrix): Matrix;
            public static divideScalar(matrix: Matrix, scalar: number): Matrix;
            public static divide(matrix1: Matrix, matrix2: Matrix): Matrix;

            public static createFromArray(a: number[][]): Matrix;
            public static createFromQuaternion(quaternion: any): Matrix;
            public static createFromYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix;
            public static createPerspective(width: number, height: number, nearPlaneDistance: number, farPlaneDistance: number): Matrix;
            public static createPerspectiveFOV(fieldOfView: number, aspectRatio: number, nearPlaneDistance: number, farPlaneDistance: number): Matrix;
            public static createRotationX(radians: number): Matrix;
            public static createRotationY(radians: number): Matrix;
            public static createRotationZ(radians: number): Matrix;
            public static createScale(x: number, y: number, z: number): Matrix;
            public static createTranslation(x: number, y: number, z: number): Matrix;
            public static createWorld(position: Vector3, forward: Vector3, up: Vector3): Matrix;
            public static lerp(matrix1: Matrix, matrix2: Matrix, amount: number): Matrix;
            public static compose(...matrices: Matrix[]): Matrix;
        }

        export class Vector3 {
            constructor(x: number, y: number, z: number);

            public x: number;
            public y: number;
            public z: number;

            public add(v2: Vector3): Vector3;
            public clamp(min: Vector3, max: Vector3): Vector3;
            public cross(v2: Vector3): Vector3;
            public distance(v2: Vector3): number;
            public distanceSquared(v2: Vector3): number;
            public divide(v2: Vector3): Vector3;
            public divideScalar(scalar: number): Vector3;
            public dot(v2: Vector3): number;
            public equals(v2: Vector3): boolean;
            public length1(): number;
            public lengthSquared(): number;
            public lerp(v2: Vector3, amount: number): Vector3;
            public max(v2: Vector3): Vector3;
            public min(v2: Vector3): Vector3;
            public multiply(v2: Vector3): Vector3;
            public multiplyScalar(scalar: number): Vector3;
            public negate(): Vector3;
            public normalize(): Vector3;
            public reflect(normal: Vector3): Vector3;
            public smoothStep(v2: Vector3, amount: number): Vector3;
            public subtract(v2: Vector3): Vector3;
            public transform(matrix: Matrix): Vector3;

            public static add(v1: Vector3, v2: Vector3): Vector3;
            public static barycentric(v1: Vector3, v2: Vector3, v3: Vector3, amount1: number, amount2: number): Vector3;
            public static catmullrom(v1: Vector3, v2: Vector3, v3: Vector3, v4: Vector3, amount: number): Vector3;
            public static clamp(v1: Vector3, min: Vector3, max: Vector3): Vector3;
            public static cross(v1: Vector3, v2: Vector3): Vector3;
            public static distance(v1: Vector3, v2: Vector3): number;
            public static distanceSquared(v1: Vector3, v2: Vector3): number;
            public static divide(v1: Vector3, v2: Vector3): Vector3;
            public static divideScalar(v1: Vector3, scalar: number): Vector3;
            public static dot(v1: Vector3, v2: Vector3): number;
            public static equals(v1: Vector3, v2: Vector3): boolean;
            public static hermite(v1: Vector3, t1: Vector3, v2: Vector3, t2: Vector3, amount: number): Vector3;
            public static length1(v1: Vector3): number;
            public static lengthSquared(v1: Vector3): number;
            public static lerp(v1: Vector3, v2: Vector3, amount: number): Vector3;
            public static max(v1: Vector3, v2: Vector3): Vector3;
            public static min(v1: Vector3, v2: Vector3): Vector3;
            public static multiply(v1: Vector3, v2: Vector3): Vector3;
            public static multiplyScalar(v1: Vector3, scalar: number): Vector3;
            public static negate(v1: Vector3): Vector3;
            public static normalize(v1: Vector3): Vector3;
            public static reflect(vector: Vector3, normal: Vector3): Vector3;
            public static smoothStep(v1: Vector3, v2: Vector3, amount: number): Vector3;
            public static subtract(v1: Vector3, v2: Vector3): Vector3;
            public static transform(v1: Vector3, matrix: Matrix): Vector3;

            public static fromObject(o: { x: number, y: number, z: number }): Vector3;
            public static backward: Vector3;
            public static down: Vector3;
            public static forward: Vector3;
            public static left: Vector3;
            public static one: Vector3;
            public static right: Vector3;
            public static unitX: Vector3;
            public static unitY: Vector3;
            public static unitZ: Vector3;
            public static up: Vector3;
            public static zero: Vector3;
        }

        export class Quaternion {
            public x: number;
            public y: number;
            public z: number;
            public w: number;

            /**
             * Initializes a new instance of Quaternion.
             * @param {number} x The x-value of the quaternion.
             * @param {number} y The y-value of the quaternion.
             * @param {number} z The z-value of the quaternion.
             * @param {number} w The w-value of the quaternion.
             */
            constructor(x: number, y: number, z: number, w: number);

            /**
             * Returns a Quaternion representing no rotation.
             * @returns {Quaternion} A Quaternion representing no rotation.
             */
            public static identity: Quaternion;

            /**
             * Determines whether the specified Quaternion is equal to the current Quaternion.
             * @param {Quaternion} q2 The Quaternion to compare with the current Quaternion.
             * @returns {boolean} <b>true</b> if the specified Object is equal to the current Quaternion; <b>false</b> otherwise.
             */
            public equals(q2: Quaternion): boolean;

            /**
             * Adds two Quaternions.
             * @param {Quaternion} q2 Quaternion to add.
             * @returns {Quaternion} Result of adding the Quaternions.
             */
            public add(q2: Quaternion): Quaternion;

            /**
             * Adds two Quaternions.
             * @param {Quaternion} q1 Quaternion to add.
             * @param {Quaternion} q2 Quaternion to add.
             * @returns {Quaternion} Result of adding the Quaternions.
             */
            public static add(q1: Quaternion, q2: Quaternion): Quaternion;

            /**
             * Subtracts a quaternion from another quaternion.
             * @param {Quaternion} q2 Source quaternion.
             * @returns {Quaternion} Result of the subtraction.
             */
            public subtract(q2: Quaternion): Quaternion;

            /**
             * Subtracts a quaternion from another quaternion.
             * @param {Quaternion} q1 Source quaternion.
             * @param {Quaternion} q2 Source quaternion.
             * @returns {Quaternion} Result of the subtraction.
             */
            public static subtract(q1: Quaternion, q2: Quaternion): Quaternion;

            /**
             * Multiplies two quaternions.
             * @param {Quaternion} q2 The quaternion on the right of the multiplication.
             * @returns {Quaternion} The result of the multiplication.
             */
            public multiply(q2: Quaternion): Quaternion;

            /**
             * Multiplies two quaternions.
             * @param {Quaternion} q1 The quaternion on the left of the multiplication.
             * @param {Quaternion} q2 The quaternion on the right of the multiplication.
             * @returns {Quaternion} The result of the multiplication.
             */
            public static multiply(q1: Quaternion, q2: Quaternion): Quaternion;

            /**
             * Multiplies a quaternion by a scalar value.
             * @param {number} scalar Scalar value.
             * @returns {Quaternion} The result of the multiplication.
             */
            public multiplyScalar(scalar: number): Quaternion;

            /**
             * Multiplies a quaternion by a scalar value.
             * @param {Quaternion} q1 Source quaternion.
             * @param {number} scalar Scalar value.
             * @returns {Quaternion} The result of the multiplication.
             */
            public static multiplyScalar(q1: Quaternion, scalar: number): Quaternion;

            /**
             * Divides a Quaternion by another Quaternion.
             * @param {Quaternion} q2 The divisor.
             * @returns {Quaternion} Result of the division.
             */
            public divide(q2: Quaternion): Quaternion;

            /**
             * Divides a Quaternion by another Quaternion.
             * @param {Quaternion} q1 Source Quaternion.
             * @param {Quaternion} q2 The divisor.
             * @returns {Quaternion} Result of the division.
             */
            public static divide(q1: Quaternion, q2: Quaternion): Quaternion;

            /**
             * Calculates the length squared of a Quaternion.
             * @returns {number} The length squared of the Quaternion.
             */
            public lengthSquared(): number;

            /**
             * Calculates the length of a Quaternion.
             * @returns {number} The length of the Quaternion.
             */
            public length(): number;

            /**
             * Divides each component of the quaternion by the length of the quaternion.
             */
            public normalize(): void;

            /**
             * Divides each component of the quaternion by the length of the quaternion.
             * @param {Quaternion} q1 Source quaternion.
             * @returns {Quaternion} Normalized quaternion.
             */
            public static normalize(q1: Quaternion): Quaternion;

            /**
             * Transforms this Quaternion into its conjugate.
             */
            public conjugate(): void;

            /**
             * Returns the conjugate of a specified Quaternion.
             * @param {Quaternion} q1 The Quaternion of which to return the conjugate.
             * @returns {Quaternion} A new Quaternion that is the conjugate of the specified one.
             */
            public static conjugate(q1: Quaternion): Quaternion;

            /**
             * Returns the inverse of a Quaternion.
             * @returns {Quaternion} The inverse of the Quaternion.
             */
            public inverse(): Quaternion;

            /**
             * Returns the inverse of a Quaternion.
             * @param {Quaternion} q1 Source Quaternion.
             * @returns {Quaternion} The inverse of the Quaternion.
             */
            public static inverse(q1: Quaternion): Quaternion;

            /**
             * Creates a Quaternion from a vector and an angle to rotate about the vector.
             * @param {Vector3} vector The vector to rotate around.
             * @param {number} angle The angle to rotate around the vector.
             * @returns {Quaternion} The created Quaternion.
             */
            public static createFromAxisAngle(vector: Vector3, angle: number): Quaternion;

            /**
             * Creates a new Quaternion from specified yaw, pitch, and roll angles.
             * @param {number} yaw The yaw angle, in radians, around the y-axis.
             * @param {number} pitch The pitch angle, in radians, around the x-axis.
             * @param {number} roll The roll angle, in radians, around the z-axis.
             * @returns {Quaternion} A new Quaternion expressing the specified yaw, pitch, and roll angles.
             */
            public static createFromYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion;

            /**
             * Creates a Quaternion from a rotation Matrix.
             * @param {Matrix} m The rotation Matrix to create the Quaternion from.
             * @returns {Quaternion} The created Quaternion.
             */
            public static createFromRotationMatrix(m: Matrix): Quaternion;

            /**
             * Calculates the dot product of two Quaternions.
             * @param {Quaternion} q1 Source Quaternion.
             * @param {Quaternion} q2 Source Quaternion.
             * @returns {number} Dot product of the Quaternions.
             */
            public static dot(q1: Quaternion, q2: Quaternion): number;

            /**
             * Interpolates between two quaternions, using spherical linear interpolation.
             * @param {Quaternion} q1 Source quaternion.
             * @param {Quaternion} q2 Source quaternion.
             * @param {number} amount Value that indicates how far to interpolate between the quaternions.
             * @returns {Quaternion} Result of the interpolation.
             */
            public static slerp(q1: Quaternion, q2: Quaternion, amount: number): Quaternion;

            /**
             * Linearly interpolates between two quaternions.
             * @param {Quaternion} q1 Source quaternion.
             * @param {Quaternion} q2 Source quaternion.
             * @param {number} amount Value indicating how far to interpolate between the quaternions.
             * @returns {Quaternion} The resulting quaternion.
             */
            public static lerp(q1: Quaternion, q2: Quaternion, amount: number): Quaternion;

            /**
             * Concatenates two Quaternions; the result represents the first rotation followed by the second rotation.
             * @param {Quaternion} q1 The first Quaternion rotation in the series.
             * @param {Quaternion} q2 The second Quaternion rotation in the series.
             * @returns {Quaternion} A new Quaternion representing the concatenation of the <i>value1</i> rotation followed by
             * the <i>value2</i> rotation.
             */
            public static concatenate(q1: Quaternion, q2: Quaternion): Quaternion;

            /**
             * Flips the sign of each component of the quaternion.
             * @param {Quaternion} q1 Source quaternion.
             * @returns {Quaternion} Negated quaternion.
             */
            public static negate(q1: Quaternion): Quaternion;
        }
    }
}
